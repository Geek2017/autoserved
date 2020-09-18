<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstimatePmsOthersTable extends Migration
{
    public function up()
    {
        Schema::create('estimate_pms_others', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('request_pms_others_id')->unsigned();
            $table->integer('liters')->unsigned()->nullable();
            $table->bigInteger('estimate_id')->unsigned();
            $table->string('notes')->nullable();

            $table->foreign('request_pms_others_id')
                ->references('id')
                ->on('request_pms_others')
                ->onDelete('no action');
            $table->foreign('estimate_id')
                ->references('id')
                ->on('estimates')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('estimate_pms_others');
    }
}
