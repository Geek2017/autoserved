<?php

use App\Shop;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $shop_types = [
                Shop::SHOP_TYPE_ACCESSORY_SHOP,
                Shop::SHOP_TYPE_AUTO_AIRCON_REPAIR,
                Shop::SHOP_TYPE_AUTO_DETAILING,
                Shop::SHOP_TYPE_AUTO_PARTS,
                Shop::SHOP_TYPE_AUTO_REPAIR,
                Shop::SHOP_TYPE_AUTO_ELECTRICAL,
                Shop::SHOP_TYPE_BATTERY_SHOP,
                Shop::SHOP_TYPE_CAR_PAINT,
                Shop::SHOP_TYPE_CAR_WASH,
                Shop::SHOP_TYPE_CAR_WRAP,
                Shop::SHOP_TYPE_DEALER_SERVICE_CENTER,
                Shop::SHOP_TYPE_EMISSION_CENTER,
                Shop::SHOP_TYPE_GAS_STATION,
                Shop::SHOP_TYPE_GLASS_REPAIR,
                Shop::SHOP_TYPE_SERVICE_CENTER,
                Shop::SHOP_TYPE_TINT_SHOP,
                Shop::SHOP_TYPE_TIRE_SHOP,
                Shop::SHOP_TYPE_TOWING_SERVICE,
                Shop::SHOP_TYPE_UPHOLSTERY,
                Shop::SHOP_TYPE_VULCANIZING_SHOP,
            ];

            $table->bigIncrements('id');
            $table->string('name');
            $table->string('slug');
            $table->enum('type', $shop_types)->nullable();
            $table->bigInteger('avatar_id')->unsigned()->nullable();
            $table->bigInteger('banner_id')->unsigned()->nullable();
            $table->string('contact')->nullable();
            $table->longText('description')->nullable();
            $table->longText('address')->nullable();
            $table->string('city')->nullable();
            $table->string('zip')->nullable();
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->text('operations')->nullable();
            $table->text('features')->nullable();
            $table->text('amenities')->nullable();
            $table->text('payment_method')->nullable();
            $table->decimal('completion', 3, 2)->nullable()->default(0);
            $table->integer('level')->nullable();
            $table->string('status')->default('pending');
            $table->bigInteger('user_id')->unsigned();
            $table->boolean('pms_enabled')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
            $table->foreign('avatar_id')
                ->references('id')
                ->on('uploads')
                ->onDelete('set null');
            $table->foreign('banner_id')
                ->references('id')
                ->on('uploads')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shops');
    }
}
