<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFleetKeyAndTokenFleetTable extends Migration
{
    public function up()
    {
        Schema::table('fleet', function (Blueprint $table) {
            $table->string('fleet_key')->nullable()->after('fleet_admin');
            $table->string('token')->nullable()->after('fleet_key');
        });
    }

    public function down()
    {
        Schema::table('fleet', function (Blueprint $table) {
            $table->dropColumn('fleet_key');
            $table->dropColumn('token');
        });
    }
}
