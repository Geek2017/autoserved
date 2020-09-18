<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterlistPmsOthersTable extends Migration
{
    public function up()
    {
        Schema::create('masterlist_pms_others', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('type');
            $table->longText('details')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('masterlist_pms_others');
    }
}
