<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Appointment;
use Faker\Generator as Faker;

$factory->define(Appointment::class, function (Faker $faker) {
    return [
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
    ];
});
