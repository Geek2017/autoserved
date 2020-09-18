<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOtherItemsEstimatePmsOthersTable extends Migration
{
    public function up()
    {
        Schema::table('estimate_pms_others', function (Blueprint $table) {
            $table->text('other_items')->after('estimate_id');
            $table->text('other_replacement_items')->after('other_items');
        });
    }

    public function down()
    {
        Schema::table('estimate_pms_others', function (Blueprint $table) {
            $table->dropColumn('other_items');
            $table->dropColumn('other_replacement_items');
        });
    }
}
