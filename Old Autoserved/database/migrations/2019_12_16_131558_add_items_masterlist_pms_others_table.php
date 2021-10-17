<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddItemsMasterlistPmsOthersTable extends Migration
{
    public function up()
    {
        Schema::table('masterlist_pms_others', function (Blueprint $table) {
            $table->text('items')->after('type');
        });
    }

    public function down()
    {
        Schema::table('masterlist_pms_others', function (Blueprint $table) {
            $table->dropColumn('items');
        });
    }
}
