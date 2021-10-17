<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWalletsTable extends Migration
{
    public function up(): void
    {
        Schema::create('wallets', function (Blueprint $table) {
            $table->increments('id');
            $table->morphs('holder');
            $table->string('name');
            $table->string('slug')->index();
            $table->string('description')->nullable();
            $table->bigInteger('balance')->default(0);
            $table->timestamps();

            $table->unique(['holder_type', 'holder_id', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::drop('wallets');
    }
}
