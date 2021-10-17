<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCustomerIdEstimatesTable extends Migration
{
    public function up()
    {
        Schema::table('estimates', function (Blueprint $table) {
            $table->bigInteger('customer_id')->unsigned()->after('id');

            $table->foreign('customer_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::table('estimates', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->dropColumn('customer_id');
        });
    }
}
