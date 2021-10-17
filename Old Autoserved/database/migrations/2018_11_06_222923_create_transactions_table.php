<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->morphs('payable');
            $table->enum('type', ['deposit', 'withdraw'])->index();
            $table->bigInteger('amount');
            $table->boolean('confirmed');
            $table->longText('meta')->nullable();
            $table->uuid('uuid')->unique();
            $table->timestamps();

            $table->index(['payable_type', 'payable_id', 'type'], 'payable_type_ind');
            $table->index(['payable_type', 'payable_id', 'confirmed'], 'payable_confirmed_ind');
            $table->index(['payable_type', 'payable_id', 'type', 'confirmed'], 'payable_type_confirmed_ind');
        });
    }

    public function down(): void
    {
        Schema::drop('transactions');
    }
}
