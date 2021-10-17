<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\RequestJob;
use Faker\Generator as Faker;

$factory->define(RequestJob::class, function (Faker $faker) {
    return [
    	'status' => $faker->randomElement(['pending', 'open', 'closed', 'abandoned']),
        'latitude' => $faker->latitude,
        'longitude' => $faker->longitude,
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
    ];
});
