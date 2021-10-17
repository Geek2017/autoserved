<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestPmsOthersTable extends Migration
{
    public function up()
    {
        Schema::create('request_pms_others', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('masterlist_pms_others_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('request_id')->unsigned();
            $table->string('value');

            $table->foreign('masterlist_pms_others_id')
                ->references('id')
                ->on('masterlist_pms_others')
                ->onDelete('no action');
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
            $table->foreign('request_id')
                ->references('id')
                ->on('requests')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('request_pms_others');
    }
}
