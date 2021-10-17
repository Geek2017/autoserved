<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLitersEstimatePmsReplacementsTable extends Migration
{
    public function up()
    {
        Schema::table('estimate_pms_replacements', function (Blueprint $table) {
            $table->integer('liters')->unsigned()->nullable()->after('price');
        });
    }

    public function down()
    {
        Schema::table('estimate_pms_replacements', function (Blueprint $table) {
            $table->dropColumn('liters');
        });
    }
}
