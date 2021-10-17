<?php

use Illuminate\Database\Seeder;
use App\Repair;
class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // How many services you need, defaulting to 10
        $shop_id = (int)$this->command->ask('What shop id should we associate this services?', 0);
        $user_id = (int)$this->command->ask('What user id should we associate this services?', 1);
        $count = (int)$this->command->ask('How many services do you need ?', 10);

        $this->command->info("Creating {$count} services.");

        $repairs = App\Repair::all();
        $min = rand(500, 2000);

        $repairs->each(function($repair) use ($count) {
            if (strpos($name, 'Fluid') || strpos($a, 'Oil'))
            {
                $capacity = array('Fully Synthetic', 'Semi Synthetic', 'Regular Oil');
                $cap_type = 'Oil Type';
            } elseif (strpos($name, 'Replacement')) {
                $capacity = array('Surplus', 'New');
                $cap_type = 'Part Type';       
            } else {
                $capacity = array('Compact/Small Sedan', 'Medium Sedan', 'Large Sedan/Wagon', 'Small SUV/AUV', 'Large SUV/Pick-Up/Van', 'Commercial');
                $cap_type = 'Vehicle Type';
            }
            DB::table('services')->insert([
                'name' => $name,
                'type' => $repair->type,
                'description' => 'a simple description for ' . $name .'.',
                'min' => $min,
                'max' => $min + ( $min * .50 ),
                'cap_type' => array_rand($cap_type),
                'capacity' => $capacity,
                'shop_id' => $shop_id,
                'user_id' => $user_id,
            ]);

            // factory(App\Service::class, $count)
            //     ->create([
            //         'name' => $name,
            //         'type' => $repair->type,
            //         'description' => 'a simple description for ' . $name .'.',
            //         'min' => $min,
            //         'max' => $min + ( $min * .50 ),
            //         'cap_type' => array_rand($cap_type),
            //         'capacity' => $capacity,
            //         'shop_id' => $shop_id,
            //         'user_id' => $user_id,
            //     ]);

            $this->command->info('Services Created!');
        });
    }
}
