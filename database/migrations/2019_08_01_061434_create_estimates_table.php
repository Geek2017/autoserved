<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstimatesTable extends Migration
{
    public function up()
    {
        Schema::create('estimates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('request_id')->unsigned();
            $table->bigInteger('shop_id')->unsigned();
            $table->longText('freebies')->nullable();
            $table->string('notes')->nullable();
            $table->string('status');
            $table->decimal('distance', 10, 2)->nullable();
            $table->decimal('multiplier', 3, 2)->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->decimal('discount', 3, 2)->nullable();
            $table->decimal('total', 10, 2)->nullable();
            $table->date('preferred_date');
            $table->string('preferred_time');
            $table->timestamps();

            $table->foreign('request_id')
                ->references('id')
                ->on('requests')
                ->onDelete('no action');
            $table->foreign('shop_id')
                ->references('id')
                ->on('shops')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('estimates');
    }
}
