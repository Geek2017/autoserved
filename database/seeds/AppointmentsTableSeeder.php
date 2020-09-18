<?php

use Illuminate\Database\Seeder;
use App\Order;
use App\Appointment;
use App\CarProfile;
use App\Shop;
use App\Estimate;

class AppointmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // How many request jobs you need, defaulting to 10
        $estimate_id = (int) $this->command->ask('What estimate id should we associate this request ?', 1);
        $car_id = (int) $this->command->ask('What car id should we associate this request ?', 1);
        $shop_id = (int) $this->command->ask('What shop id should we associate this request ?', 1);
        $estimate = Estimate::where('id', $estimate_id)->first();
        $car = CarProfile::where('id', $car_id)->first();
        $shop = Shop::where('id', $shop_id)->first();

        // Create the User
        $orders = factory(Order::class, 1)->create([
	        'estimate_id' => $estimate->id, 
			'customer_id' => $car->user_id,
			'car_id' => $car->id,
			'shop_id' => $shop->id,
			'user_id' => $shop->user_id,
			'status' => 'completed',
        ])->each(function($order) use ($car,$shop) {
        	$date_now = new DateTime();
			$date_now = date_add($date_now, date_interval_create_from_date_string('90 days'));
	        $appointments = factory(Appointment::class, 1)->create([
		        'preferred_time' => 'any time', 
				'schedule_date' => $date_now,
				'schedule_time' => '',
				'schedule_end' => '',
				'notes' => 'Call before going to shop',
				'status' => 'pending',
				'order_id' => $order->id,
				'car_id' => $car->id,
				'shop_id' => $shop->id,
	        ]);

        });



        $this->command->info('Created Appointment Successfully');
    }
}
