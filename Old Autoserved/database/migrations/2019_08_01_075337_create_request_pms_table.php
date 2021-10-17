<?php

use App\CarProfile;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestPmsTable extends Migration
{
    public function up()
    {
        Schema::create('request_pms', function (Blueprint $table) {
            $oil_type = [
                CarProfile::TYPE_OIL_REGULAR,
                CarProfile::TYPE_OIL_SEMI,
                CarProfile::TYPE_OIL_FULLY,
                CarProfile::TYPE_OIL_SHOP_RECOMMENDATION,
            ];

            $parts_type = [
                CarProfile::TYPE_PART_OEM,
                CarProfile::TYPE_PART_REPLACEMENT,
                CarProfile::TYPE_PART_SHOP_RECOMMENDATION,
            ];

            $table->bigIncrements('id');
            $table->bigInteger('masterlist_pms_id')->unsigned();
            $table->bigInteger('request_id')->unsigned();
            $table->enum('oil_type', $oil_type)->nullable();
            $table->enum('parts_type', $parts_type)->nullable();

            $table->foreign('masterlist_pms_id')
                ->references('id')
                ->on('masterlist_pms')
                ->onDelete('no action');
            $table->foreign('request_id')
                ->references('id')
                ->on('requests')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('request_pms');
    }
}
