<?php

use Illuminate\Database\Seeder;
use App\Mechanic;
use App\Shop;
use App\Upload;
use App\Repair;
use App\Service;
use App\Services\ApplicationService;

class ShopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // How many shops you need, defaulting to 10
        $user_id = (int) $this->command->ask('What user id should we associate this shop ?', 1);
        $shop_count = (int) $this->command->ask('How many shops do you need ?', 1);
        $service_count = (int) $this->command->ask('How many services do you need ?', 10);

        $this->command->info("Creating {$shop_count} shops.");

        $uploads = factory(Upload::class, 1)->create([
            'user_id' => $user_id,
        ])->first();

        $this->command->info('Uploads Created!');
        // Create the Shop
        $shops = factory(App\Shop::class, $shop_count)->create([
            'avatar_id' => $uploads->id,
            'banner_id' => $uploads->id,
            'user_id' => $user_id,
        ])->each(function($shop) use ($service_count, $user_id) {
            $appService = new ApplicationService;
            $appService->create_shop_application($user_id, $shop->id);
            $upload = factory(Upload::class, 1)->create([
                'user_id' => $shop->user_id,
            ])->first();
            $mechanics = factory(App\Mechanic::class, 5)->create([
                'image' => $upload->id,
                'user_id' => $shop->user_id
            ])->each(function($mechanic) use ($shop) {
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
                ])->each(function($service) use ($shop) {
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

        
        });


        $this->command->info('Shops Created!');

        $this->command->info("Creating {$service_count} services.");

        $this->command->info($service_count . ' Service(s) Created!');

    }
}
