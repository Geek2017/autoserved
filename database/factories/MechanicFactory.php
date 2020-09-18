<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Mechanic;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Mechanic::class, function (Faker $faker) {
    return [
		'fname' => $faker->firstName($gender = 'male'|'female'),
        'lname' => $faker->lastName,
        'certification' => function () {
            $array = ['NC 1 Passer', 'NC 2 Passer', 'NC 3 Passer'];
            return json_encode($array);
        },
        'experience' => $faker->numberBetween($min = 1, $max = 10),
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
    ];
});
