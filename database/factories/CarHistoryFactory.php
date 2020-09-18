<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\CarHistory;
use Faker\Generator as Faker;

$factory->define(CarHistory::class, function (Faker $faker) {
    return [
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s'),
    ];
});
