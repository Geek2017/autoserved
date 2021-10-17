<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstimatePmsReplacementsTable extends Migration
{
    public function up()
    {
        Schema::create('estimate_pms_replacements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('request_pms_replacement_id')->unsigned();
            $table->decimal("price", 10, 2)->nullable();
            $table->bigInteger('estimate_id')->unsigned();
            $table->string('notes')->nullable();

            $table->foreign('request_pms_replacement_id')
                ->references('id')
                ->on('request_pms_replacements')
                ->onDelete('no action');
            $table->foreign('estimate_id')
                ->references('id')
                ->on('estimates')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('estimate_pms_replacements');
    }
}
