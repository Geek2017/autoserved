<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterlistCarMakesTable extends Migration
{
    public function up()
    {
        Schema::create('masterlist_car_makes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->integer('type_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('masterlist_car_makes');
    }
}
