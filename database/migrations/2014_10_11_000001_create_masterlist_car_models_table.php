<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterlistCarModelsTable extends Migration
{
    public function up()
    {
        Schema::create('masterlist_car_models', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('make_id')->unsigned();
            $table->string('name');
            $table->integer('type_id');

            $table->foreign('make_id')
                ->references('id')
                ->on('masterlist_car_makes')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('masterlist_car_models');
    }
}
