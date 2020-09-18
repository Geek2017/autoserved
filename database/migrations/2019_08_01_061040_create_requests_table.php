<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('car_id')->unsigned();
            $table->longText('preferred_schedule')->nullable();
            $table->string('type');
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->string('status');
            $table->timestamps();

            $table->foreign('car_id')
                ->references('id')
                ->on('car_profiles')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('requests');
    }
}
