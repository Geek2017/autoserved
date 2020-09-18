<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Upload;
use Faker\Generator as Faker;

$factory->define(Upload::class, function (Faker $faker) {
    return [
        'filename' => $faker->imageUrl,
        'type' => $faker->randomElement(['JPEG', 'PNG', 'PDF']),
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
    ];
});
