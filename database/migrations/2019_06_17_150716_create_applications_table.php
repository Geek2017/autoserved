<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApplicationsTable extends Migration
{
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('biz_reg')->unsigned()->nullable();
            $table->bigInteger('permit')->unsigned()->nullable();
            $table->bigInteger('bir_cert')->unsigned()->nullable();
            $table->tinyInteger('lifters')->nullable();
            $table->text('merch_cert')->nullable();
            $table->text('special_tools')->nullable();
            $table->bigInteger('shop_id')->unsigned();
            $table->timestamps();

            $table->foreign('biz_reg')
                ->references('id')
                ->on('uploads')
                ->onDelete('set null');
            $table->foreign('permit')
                ->references('id')
                ->on('uploads')
                ->onDelete('set null');
            $table->foreign('bir_cert')
                ->references('id')
                ->on('uploads')
                ->onDelete('set null');
            $table->foreign('shop_id')
                ->references('id')
                ->on('shops')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('applications');
    }
}
