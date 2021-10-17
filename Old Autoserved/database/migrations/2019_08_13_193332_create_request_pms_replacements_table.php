<?php

use App\CarProfile;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestPmsReplacementsTable extends Migration
{
    public function up()
    {
        Schema::create('request_pms_replacements', function (Blueprint $table) {
            $parts_type = [
                CarProfile::TYPE_PART_OEM,
                CarProfile::TYPE_PART_REPLACEMENT,
                CarProfile::TYPE_PART_SHOP_RECOMMENDATION,
            ];

            $table->bigIncrements('id');
            $table->bigInteger('request_pms_id')->unsigned();
            $table->bigInteger('change_index')->unsigned();
            $table->enum('parts_type', $parts_type)->nullable();

            $table->foreign('request_pms_id')
                ->references('id')
                ->on('request_pms')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('request_pms_replacements');
    }
}
