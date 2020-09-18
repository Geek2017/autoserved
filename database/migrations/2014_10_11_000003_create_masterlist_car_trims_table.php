<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterlistCarTrimsTable extends Migration
{
    public function up()
    {
        Schema::create('masterlist_car_trims', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('series_id')->unsigned();
            $table->bigInteger('model_id')->unsigned();
            $table->string('name');
            $table->char('year_start', 10)->nullable();
            $table->char('year_end', 10)->nullable();
            $table->integer('type_id')->nullable();

            $table->foreign('series_id')
                ->references('id')
                ->on('masterlist_car_series')
                ->onDelete('cascade');
            $table->foreign('model_id')
                ->references('id')
                ->on('masterlist_car_models')
                ->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('masterlist_car_trims');
    }
}
