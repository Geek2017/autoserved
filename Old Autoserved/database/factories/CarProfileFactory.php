<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use Faker\Generator as Faker;

$factory->define(App\CarProfile::class, function (Faker $faker) {
    $make = App\CarMake::where('name', 'Hyundai')->first();
    $model = App\CarModel::where('make_id', $make['id'])->inRandomOrder()->first();
    $serie = App\CarSerie::where('model_id', $model['id'])->inRandomOrder()->first();
    $trim = App\CarTrim::where('model_id', $model['id'])->inRandomOrder()->first();
    return [
        'type' => 'Car',
        'car_make' => $make,
        'car_model' => $model,
        'car_series' => $serie,
        'car_trim' => $trim,
        'engine_type' => $faker->randomElement(['Gasoline', 'Diesel']),
        'transmision' => $faker->randomElement(['MT', 'AT']),
        'color' => $faker->randomElement(['Red', 'White', 'Black', 'Blue']),
        'plate_number' => $faker->currencyCode() . ' ' . $faker->numberBetween($min = 1000, $max = 9000),
        'date_purchased' => $faker->dateTimeBetween($startDate = '-5 years', $endDate = '-1 years', $timezone = null),
        'current_mileage' => $faker->numberBetween($min = 10000, $max = 20000),
        'last_serviced' => $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null),
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s'),
    ];
});
