<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransfersTable extends Migration
{
    public function up(): void
    {
        Schema::create('transfers', function (Blueprint $table) {
            $table->increments('id');
            $table->morphs('from');
            $table->morphs('to');
            $table->unsignedInteger('deposit_id');
            $table->unsignedInteger('withdraw_id');
            $table->uuid('uuid')->unique();
            $table->timestamps();

            $table->foreign('deposit_id')
                ->references('id')
                ->on('transactions')
                ->onDelete('cascade');
            $table->foreign('withdraw_id')
                ->references('id')
                ->on('transactions')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::drop('transfers');
    }
}
