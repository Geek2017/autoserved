<?php

use Illuminate\Database\Seeder;
use App\Estimate;

class EstimatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // How many request jobs you need, defaulting to 10
        $vendor_id = (int) $this->command->ask('What vendor user id should we associate this request ?', 1);
        $customer_id = (int) $this->command->ask('What customer user id should we associate this request ?', 1);
        $car_id = (int) $this->command->ask('What car id should we associate this request ?', 1);
        $shop_id = (int) $this->command->ask('What shop id should we associate this request ?', 1);

        $distance = '1 KM';
        $multiplier = .80;
        $items = array('PMS 5000');
        $freebies = '';
        $amount = 5000;
        $discount = 10;
        $status = 'open';

        // Create the User
        $estimates = factory(Estimate::class, 1)->create([
            'user_id' => $vendor_id,
            'customer_id' => $customer_id,
            'car_id' => $car_id,
            'shop_id' => $shop_id,
            'distance' => $distance,
            'multiplier' => $multiplier,
            'items' => $items,
            'amount' => $amount,
            'discount' => $discount,
            'status' => $status
        ]);



        $this->command->info('Created Estimate Successfully');
    }
}
