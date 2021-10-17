<?php

use App\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $user_types = [
                User::USER_TYPE_ADMIN,
                User::USER_TYPE_CUSTOMER,
                User::USER_TYPE_VENDOR,
                User::USER_TYPE_FLEET_ADMIN,
            ];

            $table->bigIncrements('id');
            $table->string('fname');
            $table->string('lname');
            $table->string('email')->unique();
            $table->string('password');
            $table->tinyInteger('mobile')->unique()->nullable();
            $table->string('image')->nullable();
            $table->string('provider')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('country')->nullable();
            $table->enum('user_type', $user_types)->default(User::USER_TYPE_CUSTOMER);
            $table->string('verification_token')->nullable();
            $table->longText('social')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table('users')->insert(
            array(
                'fname' => "Super",
                'lname' => "Administrator",
                'email' => "admin@autoserved.com",
                'country' => "Philippines",
                'user_type' => User::USER_TYPE_ADMIN,
                'password' => Hash::make('P@ssw0rd123'),
            )
        );

        DB::table('users')->insert(
            array(
                'fname' => "Shop",
                'lname' => "User",
                'email' => "shop@autoserved.com",
                'country' => "Philippines",
                'user_type' => User::USER_TYPE_VENDOR,
                'password' => Hash::make('P@ssw0rd123'),
            )
        );

        DB::table('users')->insert(
            array(
                'fname' => "Customer",
                'lname' => "User",
                'email' => "customer@autoserved.com",
                'country' => "Philippines",
                'user_type' => User::USER_TYPE_CUSTOMER,
                'password' => Hash::make('P@ssw0rd123'),
            )
        );

        DB::table('users')->insert(
            array(
                'fname' => "Fleet",
                'lname' => "User",
                'email' => "fleet@autoserved.com",
                'country' => "Philippines",
                'user_type' => User::USER_TYPE_FLEET_ADMIN,
                'password' => Hash::make('P@ssw0rd123'),
            )
        );
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
