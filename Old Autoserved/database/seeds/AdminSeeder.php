<?php

use Illuminate\Database\Seeder;
use App\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		User::create([
            'fname' => 'AutoServed',
            'lname' => 'Admin',
            'email' => 'cto@autoserved.com',
            'email_verified_at' => now(),
            'password' => bcrypt('verysafepassword2019'),
            'admin' => 1,
        ]);
    }
}
