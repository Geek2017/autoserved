<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopPmsOthersTable extends Migration
{
    public function up()
    {
        Schema::create('shop_pms_others', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('masterlist_pms_others_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->text('values')->nullable();

            $table->foreign('masterlist_pms_others_id')
                ->references('id')
                ->on('masterlist_pms_others')
                ->onDelete('no action');
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_pms_others');
    }
}
