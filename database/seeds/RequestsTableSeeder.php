<?php

use Illuminate\Database\Seeder;
use App\Http\Controllers\DistanceMultiplierController;

class RequestsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // How many request jobs you need, defaulting to 10
        $user_id = (int) $this->command->ask('What user id should we associate this request ?', 1);
        $car_id = (int) $this->command->ask('What car id should we associate this request ?', 1);
        $count = (int) $this->command->ask('How many request jobs do you need ?', 2);

        $this->command->info("Creating {$count} request jobs.");
        // Create the User
        $request_jobs = factory(App\RequestJob::class, $count)->create([
            'user_id' => $user_id,
            'car_id' => $car_id,
            'schedules' => array((new \DateTime())->format('Y-m-d'))
        ])->each(function($request) use ( $user_id) {
            $shop = App\Shop::where('user_id', $user_id)->first();
            $get_distance = new DistanceMultiplierController;
            $this->command->info('ID:' . $user_id);
            $this->command->info('Request Lat:' . $request->latitude);
            $this->command->info('Request Lon:' . $request->longitude);
            $this->command->info('Shop Lat:' . $shop->latitude);
            $this->command->info('Shop Lon:' . $shop->longitude);
            $distance = $get_distance->compute_distance($request->latitude, $request->longitude, $shop->latitude, $shop->longitude, 'K');
            $request_shop = factory(App\Request_Shop::class, 1)->create([
                'shop_id' => $shop->id,
                'request_id'=> $request->id,
                'distance' => $distance
            ]);
        });



        $this->command->info($count . ' Request(s) Created!');
    }
}
