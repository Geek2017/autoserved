<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterlistPmsTable extends Migration
{
    public function up()
    {
        Schema::create('masterlist_pms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('mileage');
            $table->longText('check_items')->nullable();
            $table->longText('clean_items')->nullable();
            $table->longText('change_items')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('masterlist_pms');
    }
}
