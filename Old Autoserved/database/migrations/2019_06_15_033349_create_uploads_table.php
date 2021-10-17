<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUploadsTable extends Migration
{
    public function up()
    {
        Schema::create('uploads', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->longText('filename');
            $table->string('type');
            $table->string('path')->nullable();
            $table->bigInteger('size')->nullable();
            $table->string('document_type')->nullable();
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::dropIfExists('uploads');
    }
}
