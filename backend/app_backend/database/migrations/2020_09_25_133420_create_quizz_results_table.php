<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizzResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('quizz_results', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('user_email');
            $table->foreign('user_email')->references('email')->on('users')->onDelete('cascade');
            $table->string('user_name');
            $table->bigInteger('quizz_id')->unsigned()->nullable();
            $table->foreign('quizz_id')->references('id')->on('quizzs')->onDelete('cascade');
            $table->string('result_string');
            $table->string('function1');
            $table->string('function2');
            $table->string('function3');
            $table->string('function4');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quizz_results');
    }
}
