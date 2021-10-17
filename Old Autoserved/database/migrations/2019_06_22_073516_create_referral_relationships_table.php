<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReferralRelationshipsTable extends Migration
{
    public function up()
    {
        Schema::create('referral_relationships', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('referral_link_id');
            $table->integer('user_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('referral_relationships');
    }
}
