<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReferralProgramsTable extends Migration
{
    public function up()
    {
        Schema::create('referral_programs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('uri');
            $table->integer('lifetime_minutes')->default(30 * 24 * 60);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('referral_programs');
    }
}
