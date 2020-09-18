<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarSchedulesTable extends Migration
{
    public function up()
    {
        Schema::create('car_schedules', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('schedule');
            $table->bigInteger('masterlist_pms_id');
            $table->bigInteger('car_id')->unsigned();
            $table->timestamps();

            $table->foreign('car_id')
                ->references('id')
                ->on('car_profiles')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('car_schedules');
    }
}
