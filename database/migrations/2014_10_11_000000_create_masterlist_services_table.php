<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterlistServicesTable extends Migration
{
    public function up()
    {
        Schema::create('masterlist_services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('type');
            $table->string('name');
            $table->string('details');
        });
    }

    public function down()
    {
        Schema::dropIfExists('masterlist_services');
    }
}
