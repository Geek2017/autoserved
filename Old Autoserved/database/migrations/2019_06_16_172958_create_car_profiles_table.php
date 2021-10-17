<?php

use App\CarProfile;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarProfilesTable extends Migration
{
    public function up()
    {
        Schema::create('car_profiles', function (Blueprint $table) {
            $car_types = [
                CarProfile::TYPE_VEHICLE_COMPACT,
                CarProfile::TYPE_VEHICLE_MEDIUM,
                CarProfile::TYPE_VEHICLE_LARGE,
                CarProfile::TYPE_VEHICLE_SMALL,
                CarProfile::TYPE_VEHICLE_VAN,
                CarProfile::TYPE_VEHICLE_COMMERCIAL,
            ];

            $transmission_type = [
                CarProfile::TYPE_TRANSMISSION_AUTO,
                CarProfile::TYPE_TRANSMISSION_MANUAL,
            ];

            $engine_type = [
                CarProfile::TYPE_ENGINE_DIESEL,
                CarProfile::TYPE_ENGINE_GASOLINE,
            ];

            $table->bigIncrements('id');
            $table->enum('type', $car_types)->nullable();
            $table->bigInteger('make_id')->unsigned()->nullable();
            $table->bigInteger('model_id')->unsigned()->nullable();
            $table->bigInteger('trim_id')->unsigned()->nullable();
            $table->smallInteger('car_year')->unsigned()->nullable();
            $table->enum('engine_type', $engine_type)->nullable();
            $table->enum('transmission', $transmission_type)->nullable();
            $table->char('color', 15)->nullable();
            $table->char('plate_number', 10)->nullable();
            $table->date('date_purchased')->nullable();
            $table->integer('current_mileage')->nullable();
            $table->date('last_serviced')->nullable();
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->bigInteger('user_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
            $table->foreign('make_id')
                ->references('id')
                ->on('masterlist_car_makes')
                ->onDelete('set null');
            $table->foreign('model_id')
                ->references('id')
                ->on('masterlist_car_models')
                ->onDelete('set null');
            $table->foreign('trim_id')
                ->references('id')
                ->on('masterlist_car_trims')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('car_profiles');
    }
}
