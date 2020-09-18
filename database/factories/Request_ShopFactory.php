<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Request_Shop;
use Faker\Generator as Faker;

$factory->define(Request_Shop::class, function (Faker $faker) {
    return [
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
    ];
});
