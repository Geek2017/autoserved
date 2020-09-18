<?php

namespace App\Http\Controllers;

use Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PayPal\Api\Amount;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;

class PaypalPaymentController extends Controller
{
    private function get_context()
    {
        $paypal_conf = Config::get('paypal');
        $context = new ApiContext(
            new OAuthTokenCredential(
                $paypal_conf['client_id'],
                $paypal_conf['secret']
            )
        );
        $context->setConfig($paypal_conf['settings']);
        return $context;
    }

    public function pay_with_paypal(Request $request)
    {
        $result = ['success' => false];
        $user = Auth::user();
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');
        $item = new Item();
        $item->setName('WALLET-' . $request['amount'])
            ->setCurrency('PHP')
            ->setQuantity(1)
            ->setPrice($request['amount']);
        $item_list = new ItemList();
        $item_list->setItems([$item]);
        $amount = new Amount();
        $amount->setCurrency('PHP')
            ->setTotal($request['amount']);
        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($item_list)
            ->setDescription('Your transaction description');
        $redirect_urls = new RedirectUrls();
        $redirect_urls->setReturnUrl(env('APP_URL') . '/top-up')
            ->setCancelUrl(env('APP_URL') . '/top-up');
        $payment = new Payment();
        $payment->setIntent('Sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirect_urls)
            ->setTransactions([$transaction]);
        $payment->create($this->get_context());

        foreach ($payment->getLinks() as $link) {
            if ($link->getRel() === 'approval_url') {
                $redirect_url = $link->getHref();
                break;
            }
        }

        if (isset($redirect_url)) {
            $user->deposit($request['amount'], [
                'currency' => 'PHP',
                'payId' => $payment->getId(),
                'type' => 'WALLET-' . $request['amount'],
                'description' => 'account wallet top-up',
            ], false);
            $result = [
                'success' => true,
                'data' => [
                    'url' => $redirect_url,
                ],
            ];
        }

        return response()->json($result);
    }

    public function get_payment_status()
    {
        $result = ['success' => false];
        $user = Auth::user();
        $latest_transaction = $user->transactions()->latest('created_at')->first();
        $context = $this->get_context();
        $payment_id = $latest_transaction->meta['payId'];
        $payer_id = request()->query('PayerID');
        $token = request()->query('token');

        if (!is_null($payer_id) && !is_null($token)) {
            $payment = Payment::get($payment_id, $context);
            $execution = new PaymentExecution();
            $execution->setPayerId($payer_id);
            $value = $payment->execute($execution, $context);

            if ($value->getState() === 'approved') {
                $result['success'] = true;

                if (!$latest_transaction->confirmed) {
                    $user->confirm($latest_transaction);
                }
            }
        }

        return response()->json($result);
    }
}
