<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Estimate;
use Faker\Generator as Faker;

$factory->define(Estimate::class, function (Faker $faker) {
    return [
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
    ];
});
