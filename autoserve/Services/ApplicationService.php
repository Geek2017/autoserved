<?php

namespace App\Services;

use App\Application;
use Illuminate\Http\Request;

class ApplicationService
{
    public function create_shop_application($user_id, $shop_id)
    {
        $result = null;

        $application = Application::create([
            'user_id' => $user_id,
            'shop_id' => $shop_id,
        ]);

        if ($application !== null) {
            $result = [
                'id' => $application->id,
            ];
        }

        return $result;
    }

    public function get($id)
    {
        return Application::find($id);
    }

    public function get_application_by_shop($shop_id)
    {
        return Application::where(['shop_id' => $shop_id])->first();
    }

    public function update_application($application_id, $doc_type, $file_id)
    {
        $result = null;
        $application = $this->get($application_id);

        if (!is_null($application)) {
            $result = $application;
            $application[$doc_type] = $file_id;
            $application->shop;
            $application->save();
        }

        return $result;
    }

    public function update(Request $request, $application_id)
    {
        $result = null;
        $application = $this->get($application_id);

        if (!is_null($application)) {
            $application->lifters = $request['lifters'] ? $request['lifters'] : $application->lifters;
            $application->merch_cert = $request['merch_cert'];
            $application->special_tools = $request['special_tools'];
            $application->shop;
            $application->save();
            $result = $application;
        }

        return $result;
    }

    public function verify($application_id, $type)
    {
        $result = null;
        $application = $this->get($application_id);

        if (!is_null($application)) {
            switch ($type) {
                case Application::APPLICATION_TYPE_BIZ_REG:{
                        $application->verified_biz_reg = true;
                        break;
                    }
                case Application::APPLICATION_TYPE_PERMIT:{
                        $application->verified_permit = true;
                        break;
                    }
                case Application::APPLICATION_TYPE_BIR_CERT:{
                        $application->verified_bir_cert = true;
                        break;
                    }
                case Application::APPLICATION_TYPE_LIFTERS:{
                        $application->verified_lifters = true;
                        break;
                    }
                case Application::APPLICATION_TYPE_MERCH_CERT:{
                        $application->verified_merch_cert = true;
                        break;
                    }
                case Application::APPLICATION_TYPE_SPECIAL_TOOLS:{
                        $application->verified_special_tools = true;
                        break;
                    }
            }
            $application->save();
            $result = $application;
        }

        return $result;
    }
}
