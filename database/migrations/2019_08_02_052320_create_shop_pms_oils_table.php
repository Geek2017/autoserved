<?php

use App\CarProfile;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopPmsOilsTable extends Migration
{
    public function up()
    {
        Schema::create('shop_pms_oils', function (Blueprint $table) {
            $oil_types = [
                CarProfile::TYPE_OIL_REGULAR,
                CarProfile::TYPE_OIL_SEMI,
                CarProfile::TYPE_OIL_FULLY,
                CarProfile::TYPE_OIL_SHOP_RECOMMENDATION,
            ];

            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->integer('mileage');
            $table->enum('oil_type', $oil_types)->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('notes')->nullable();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_pms_oil');
    }
}
