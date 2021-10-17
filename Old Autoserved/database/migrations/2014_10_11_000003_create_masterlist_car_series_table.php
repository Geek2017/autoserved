<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterlistCarSeriesTable extends Migration
{
    public function up()
    {
        Schema::create('masterlist_car_series', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('model_id')->unsigned();
            $table->bigInteger('gen_id')->unsigned()->nullable();
            $table->string('name');
            $table->integer('type_id');

            $table->foreign('model_id')
                ->references('id')
                ->on('masterlist_car_models')
                ->onDelete('cascade');
            $table->foreign('gen_id')
                ->references('id')
                ->on('masterlist_car_generations')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('masterlist_car_series');
    }
}
