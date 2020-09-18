<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterMobileTypeInUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('mobile');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('mobile', 50)->nullable()->after('password');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('mobile');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->tinyInteger('mobile')->unique()->nullable();
        });
    }
}
