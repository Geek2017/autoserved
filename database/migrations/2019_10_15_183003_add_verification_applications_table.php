<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVerificationApplicationsTable extends Migration
{
    public function up()
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->boolean('verified_biz_reg')->unsigned()->nullable()->after('biz_reg')->default(false);
            $table->boolean('verified_permit')->unsigned()->nullable()->after('permit')->default(false);
            $table->boolean('verified_bir_cert')->unsigned()->nullable()->after('bir_cert')->default(false);
            $table->boolean('verified_lifters')->unsigned()->nullable()->after('lifters')->default(false);
            $table->boolean('verified_merch_cert')->unsigned()->nullable()->after('merch_cert')->default(false);
            $table->boolean('verified_special_tools')->unsigned()->nullable()->after('special_tools')->default(false);
        });
    }

    public function down()
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn('verified_biz_reg');
            $table->dropColumn('verified_permit');
            $table->dropColumn('verified_bir_cert');
            $table->dropColumn('verified_lifters');
            $table->dropColumn('verified_merch_cert');
            $table->dropColumn('verified_special_tools');
        });
    }
}
