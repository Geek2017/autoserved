<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Application;
use Faker\Generator as Faker;

$factory->define(Application::class, function (Faker $faker) {
	static $number = 2;
    return [
        'biz_reg' => $faker->randomElement([1,2,3]),
        'permit' => $faker->randomElement([1,2,3]),
        'bir_cert' => $faker->randomElement([1,2,3]),
        'lifters' => $faker->randomElement([1,2,3,4,5,6,7,8]),
        'merch_cert' => function() {
        	$array = ['NC1 Passer', 'NC2 Passer', '1 Year Experience'];
        	return json_encode($array);
        },
        'shop_size' => 'Service Center',
        'special_tools' => function() {
        	$array = ['Lifter', 'Car Scanner'];
        	return json_encode($array);
        },        
        'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
    ];
});
