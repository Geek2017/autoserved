<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestServicesTable extends Migration
{
    public function up()
    {
        Schema::create('request_services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('masterlist_services_id')->unsigned();
            $table->bigInteger('request_id')->unsigned();

            $table->foreign('masterlist_services_id')
                ->references('id')
                ->on('masterlist_services')
                ->onDelete('no action');
            $table->foreign('request_id')
                ->references('id')
                ->on('requests')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('request_services');
    }
}
