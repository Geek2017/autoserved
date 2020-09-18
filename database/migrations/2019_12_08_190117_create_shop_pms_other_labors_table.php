<?php

use App\CarProfile;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopPmsOtherLaborsTable extends Migration
{
    public function up()
    {
        Schema::create('shop_pms_other_labors', function (Blueprint $table) {
            $car_types = [
                CarProfile::TYPE_VEHICLE_COMPACT,
                CarProfile::TYPE_VEHICLE_MEDIUM,
                CarProfile::TYPE_VEHICLE_LARGE,
                CarProfile::TYPE_VEHICLE_SMALL,
                CarProfile::TYPE_VEHICLE_VAN,
                CarProfile::TYPE_VEHICLE_COMMERCIAL,
            ];

            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->bigInteger('masterlist_pms_others_id')->unsigned();
            $table->enum('car_type', $car_types)->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('notes')->nullable();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
            $table->foreign('masterlist_pms_others_id')
                ->references('id')
                ->on('masterlist_pms_others')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_pms_other_labors');
    }
}
