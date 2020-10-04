<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizzAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('quizz_answers', function (Blueprint $table) {
            $table->id();
            $table->string('user_email');
            $table->string('user_name');
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->bigInteger('quizz_id')->unsigned()->nullable();
            $table->bigInteger('quizzresult_id')->unsigned()->nullable();
            $table->foreign('user_email')->references('email')->on('users')->onDelete('cascade');
            $table->foreign('quizz_id')->references('id')->on('quizzs')->onDelete('cascade');
            $table->foreign('quizzresult_id')->references('id')->on('quizz_results')->onDelete('cascade');
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
        Schema::dropIfExists('quizz_answers');
    }
}
