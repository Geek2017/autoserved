<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Shop;
use Faker\Generator as Faker;

$factory->define(Shop::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'type' => $faker->randomElement(['Service Center', 'Repair Center']),
        'contact' => $faker->phoneNumber,
        'description' => $faker->paragraph,
        'address' => $faker->address,
        'city' => $faker->city,
        'zip' => $faker->postcode,
        'latitude' => $faker->latitude,
        'longitude' => $faker->longitude,
        'operations' => function () {
            $array = array(
                'sun' => ['open' => false, 'start' => 8, 'end' => 17],
                'mon' => ['open' => false, 'start' => 8, 'end' => 17],
                'tue' => ['open' => false, 'start' => 8, 'end' => 17],
                'wed' => ['open' => false, 'start' => 8, 'end' => 17],
                'thu' => ['open' => false, 'start' => 8, 'end' => 17],
                'fri' => ['open' => false, 'start' => 8, 'end' => 17],
                'sat' => ['open' => false, 'start' => 8, 'end' => 17],
            );

            return json_encode($array);
        },
        'features' => function () {
            $array = ['Car Bay Capacity: 10', 'Car Types Serviced:', 'Wheels and Tires', 'Maintenance and Mechanical Repairs'];
            return json_encode($array);
        },
        'amenities' => function () {
            $array = ['Lifter', 'A/C Available', 'Waiting Area', 'Wifi'];
            return json_encode($array);
        },
        'payment_method' => function () {
            $array = ['Cash', 'Credit Card'];
            return json_encode($array);
        },
        'status' => $faker->randomElement(['pending', 'confirmed', 'verified1', 'verified2', 'verified3']),
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s'),
    ];
});
