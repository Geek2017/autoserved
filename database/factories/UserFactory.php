<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'fname' => $faker->firstName($gender = 'male'|'female'),
        'lname' => $faker->lastName,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'image' => $faker->imageUrl($width = 150, $height = 150),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'country' => $faker->countryCode,
        // 'user_type' => $faker->randomElement(['customer', 'vendor']),
        'remember_token' => Str::random(10),
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
    ];
});
