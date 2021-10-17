<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopRatingsTable extends Migration
{
    public function up()
    {
        Schema::create('shop_ratings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('uuid');
            $table->bigInteger('appointment_id')->unsigned();
            $table->bigInteger('shop_id')->unsigned();
            $table->bigInteger('for_customer_id')->unsigned();
            $table->integer('rating')->unsigned();
            $table->text('description');
            $table->text('additional_work_items')->nullable();
            $table->timestamps();

            $table->foreign('appointment_id')
                ->references('id')
                ->on('appointments')
                ->onDelete('no action');
            $table->foreign('shop_id')
                ->references('id')
                ->on('shops')
                ->onDelete('no action');
            $table->foreign('for_customer_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        $table->dropForeign(['appointment_id', 'shop_id', 'for_customer_id']);
        Schema::dropIfExists('shop_ratings');
    }
}
