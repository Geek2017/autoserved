<?php

use App\Http\Controllers\DistanceMultiplierController;
use App\Repair;
use App\Services\ApplicationService;
use App\Upload;
use Illuminate\Database\Seeder;

class CustomerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $users = factory(App\User::class, 1)->create([
            'user_type' => 'customer',
        ]);

        $customers = $users;

        $this->command->info('(1) x User Created!');

        $car_count = (int) $this->command->ask('How many car profiles do you need ?', 1);

        $cars = array();
        foreach ($users as $user) {
            $cars = factory(App\CarProfile::class, $car_count)->create([
                'user_id' => $user->id,
            ]);

            $customers[] = $user->id;
        }

        $this->command->info('(' . $car_count . ') x Car Profiles Created!');
        $mileages = array(
            [
                'mile' => 5000,
                'requirements' => ['Replace Fuel Filter', 'Replace Timing Belt', 'Change Transmission gear', 'Change Oil'],
                'notes' => 'Have your car diagnosed',
            ],
            [
                'mile' => 10000,
                'requirements' => ['Check AC', 'Change Horm', 'Change Air Filter', 'Change Oil'],
                'notes' => 'Have your car diagnosed',
            ],
            [
                'mile' => 15000,
                'requirements' => ['Check Wiper', 'Check Engine', 'Check Brake Disk', 'Change Oil'],
                'notes' => 'Have your car diagnosed',
            ],
            [
                'mile' => 20000,
                'requirements' => ['Check Wheel Alignment', 'Check Fluid Level', 'Change Transmission gear', 'Change Oil'],
                'notes' => 'Have your car diagnosed',
            ],

        );

        $date_now = new DateTime();
        $i = 0;
        foreach ($cars as $car) {
            foreach ($mileages as $mileage) {
                $miles = $mileage['mile'];
                $requirements = $mileage['requirements'];
                $notes = $mileage['notes'];
                $schedules[] = factory(App\CarSchedule::class, 1)->create([
                    'schedule' => $date_now,
                    'mileage' => $miles,
                    'requirements' => json_encode($requirements),
                    'notes' => $notes,
                    'car_id' => $car->id,
                    'user_id' => $car->user_id,
                ]);

                $date_now = date_add($date_now, date_interval_create_from_date_string('90 days'));
            }

        }

        $this->command->info('(' . $car_count * 4 . ') x Car Schedules Created!');

        $service_count = (int) $this->command->ask('How many services do you need ?', 10);

        $shop_users = factory(App\User::class, 5)->create([
            'user_type' => 'vendor',
        ])->each(function ($user) use ($service_count, $customers) {
            $user_id = $user->id;
            $uploads = factory(Upload::class, 1)->create([
                'user_id' => $user_id,
            ])->first();

            $shops = factory(App\Shop::class, 1)->create([
                'avatar_id' => $uploads->id,
                'banner_id' => $uploads->id,
                'user_id' => $user_id,
            ])->each(function ($shop) use ($service_count, $user_id, $customers) {
                $appService = new ApplicationService;
                $appService->create_shop_application($user_id, $shop->id);
                $upload = factory(Upload::class, 1)->create([
                    'user_id' => $shop->user_id,
                ])->first();
                $mechanics = factory(App\Mechanic::class, 5)->create([
                    'image' => $upload->id,
                    'user_id' => $shop->user_id,
                ])->each(function ($mechanic) use ($shop) {
                    DB::table('mechanic_shops')->insert([
                        'shop_id' => $shop->id,
                        'mechanic_id' => $mechanic->id,
                        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
                        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s'),
                    ]);
                });

                $repairs = Repair::all();

                $i = 0;
                foreach ($repairs as $repair) {
                    $name = $repair->name;
                    if (strpos($name, 'Fluid') || strpos($name, 'Oil')) {
                        $capacity = array('Fully Synthetic', 'Semi Synthetic', 'Regular Oil');
                        $cap_type = 'Oil Type';
                    } elseif (strpos($name, 'Replacement')) {
                        $capacity = array('Surplus', 'New');
                        $cap_type = 'Part Type';
                    } else {
                        $capacity = array('Compact/Small Sedan', 'Medium Sedan', 'Large Sedan/Wagon', 'Small SUV/AUV', 'Large SUV/Pick-Up/Van', 'Commercial');
                        $cap_type = 'Vehicle Type';
                    }
                    $min = rand(500, 2000);

                    $services = factory(App\Service::class, 1)->create([
                        'repair_id' => $repair->id,
                        'description' => 'a simple description for ' . $name . '.',
                        'min' => $min,
                        'max' => $min + ($min * .50),
                        'cap_type' => $cap_type,
                        'capacity' => $capacity[rand(0, count($capacity) - 1)],
                        'user_id' => $shop->user_id,
                    ])->each(function ($service) use ($shop) {
                        DB::table('service_shops')->insert([
                            'shop_id' => $shop->id,
                            'service_id' => $service->id,
                            'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
                            'updated_at' => (new \DateTime())->format('Y-m-d H:i:s'),
                        ]);
                    });
                    if (++$i == $service_count) {
                        break;
                    }
                }

                $schedule = App\CarSchedule::all()->first();
                $requests = factory(App\RequestJob::class, 1)->create([
                    'requirements' => $schedule->requirements,
                    'longitude' => $schedule->longitude,
                    'latitude' => $schedule->latitude,
                    'schedules' => array($schedule->schedules),
                    'car_id' => $schedule->car_id,
                    'user_id' => $schedule->user_id,
                ])->each(function ($request) use ($shop) {
                    $distanceCtrl = new DistanceMultiplierController;
                    $distance = $distanceCtrl->compute_distance($request->latitude, $request->longitude, $shop->latitude, $shop->longitude, 'K');

                    $requestShops = factory(App\Request_Shop::class, 1)->create([
                        'shop_id' => $shop->id,
                        'request_id' => $request->id,
                        'distance' => $distance,
                    ]);

                    $requestedShops[] = $requestShops;
                });

            });

            $this->command->info('Shops Created!');

            $this->command->info("Creating {$service_count} services.");

            $this->command->info($service_count . ' Service(s) Created!');

        });

    }

}
