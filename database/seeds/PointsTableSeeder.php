<?php

use Illuminate\Database\Seeder;
use App\User;

class PointsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // How many request jobs you need, defaulting to 10
        $points = (int) $this->command->ask('How many points/credits ?', 1);
        $user_id = (int) $this->command->ask('What user would you like to associate this point ?', 1);

        $user = User::find($user_id);
		$user->deposit($points);

        $this->command->info('Successfully added ' . $points . ' to user id ' . $user->id);
    }
}
