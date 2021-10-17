<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('estimate_id')->unsigned();
            $table->date('scheduled_date');
            $table->string('scheduled_time');
            $table->date('end_date');
            $table->string('notes');
            $table->string('status');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('estimate_id')
                ->references('id')
                ->on('estimates')
                ->onDelete('restrict');
        });
    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}
