<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // How many users you need, defaulting to 10
        $count = (int)$this->command->ask('How many users do you need ?', 10);
        $type = $this->command-ask('What type of users do you need ?', 'vendor');

        $this->command->info("Creating {$count} users.");

        // Create the User
        $users = factory(App\User::class, $count)->create([
            'user_type' => $type,
        ]);

        $this->command->info($count . ' ' . $type . ' User(s) Created!');
    }
}
