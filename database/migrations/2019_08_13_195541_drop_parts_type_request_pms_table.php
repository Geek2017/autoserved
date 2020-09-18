<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropPartsTypeRequestPmsTable extends Migration
{
    public function up()
    {
        Schema::table('request_pms', function (Blueprint $table) {
            $table->dropColumn('parts_type');
        });
    }

    public function down()
    {
        Schema::table('request_pms', function (Blueprint $table) {
            $parts_type = [
                CarProfile::TYPE_PART_OEM,
                CarProfile::TYPE_PART_REPLACEMENT,
                CarProfile::TYPE_PART_SHOP_RECOMMENDATION,
            ];

            $table->enum('parts_type', $parts_type)->nullable();

            $table->foreign('masterlist_pms_id')
                ->references('id')
                ->on('masterlist_pms')
                ->onDelete('no action');
        });
    }
}
