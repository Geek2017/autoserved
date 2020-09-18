<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReferralLinksTable extends Migration
{
    public function up()
    {
        Schema::create('referral_links', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('referral_program_id')->unsigned();
            $table->string('code', 36)->index();
            $table->unique(['referral_program_id', 'user_id']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('referral_links');
    }
}
