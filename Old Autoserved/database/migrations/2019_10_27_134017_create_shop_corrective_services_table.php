<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopCorrectiveServicesTable extends Migration
{
    public function up()
    {
        Schema::create('shop_corrective_services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('uuid')->unique();
            $table->bigInteger('user_id')->unsigned();
            $table->decimal('min_price', 10, 2)->nullable();
            $table->decimal('max_price', 10, 2)->nullable();
            $table->bigInteger('masterlist_service_id')->unsigned();
            $table->text('description')->nullable();
            $table->boolean('require_documents')->nullable()->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
            $table->foreign('masterlist_service_id')
                ->references('id')
                ->on('masterlist_services')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_corrective_services');
    }
}
