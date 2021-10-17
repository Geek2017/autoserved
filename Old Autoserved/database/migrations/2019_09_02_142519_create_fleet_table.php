<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFleetTable extends Migration
{
    public function up()
    {
        Schema::create('fleet', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('slug');
            $table->bigInteger('avatar_id')->unsigned()->nullable();
            $table->bigInteger('banner_id')->unsigned()->nullable();
            $table->string('contact')->nullable();
            $table->longText('description')->nullable();
            $table->longText('address')->nullable();
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->string('tin')->nullable();
            $table->bigInteger('fleet_admin')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('fleet_admin')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
            $table->foreign('avatar_id')
                ->references('id')
                ->on('uploads')
                ->onDelete('set null');
            $table->foreign('banner_id')
                ->references('id')
                ->on('uploads')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('fleet');
    }
}
