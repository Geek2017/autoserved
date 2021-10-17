<?php

use Illuminate\Database\Seeder;
use App\CarSchedule;

class CarSchedulesTableSeeder extends Seeder
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
        $mileage = App\Mileage::where('mileage', 5000)->first();

        // Create the User
        $schedules = factory(CarSchedule::class, 1)->create([
            'user_id' => $user_id,
            'car_id' => $car_id,
            'schedule' => (new \DateTime())->format('Y-m-d'),
            'mileage' => 5000,
            'requirements' => $mileage->requirements,
            'notes' => ''
        ]);



        $this->command->info('Created Schedule Successfully');
    }
}
