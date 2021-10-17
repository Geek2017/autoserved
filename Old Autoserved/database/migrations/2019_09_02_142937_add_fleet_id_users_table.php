<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFleetIdUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->bigInteger('fleet_id')->unsigned()->nullable()->after('remember_token');

            $table->foreign('fleet_id')
                ->references('id')
                ->on('fleet')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['fleet_id']);
            $table->dropColumn('fleet_id');
        });
    }
}
