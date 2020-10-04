<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([ 'middleware' => 'auth:api', 'prefix' => 'user'], function () {
    Route::post('user', 'App\Http\Controllers\AuthController@user');
    Route::post('/save', 'App\Http\Controllers\AuthController@adduser');
    Route::post('/update', 'App\Http\Controllers\AuthController@updateuser');
    Route::post('/show', 'App\Http\Controllers\AuthController@user');
    Route::post('/list', 'App\Http\Controllers\AuthController@users');
    Route::post('/delete', 'App\Http\Controllers\AuthController@delete');
});

Route::group([ 'prefix' => 'auth'], function () {
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('signup', 'App\Http\Controllers\AuthController@signup');
  
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout', 'App\Http\Controllers\AuthController@logout');
        Route::post('logout', 'App\Http\Controllers\AuthController@logout');
        Route::get('user', 'App\Http\Controllers\AuthController@user');
    });
});

Route::group([ 'prefix' => 'question'], function () {
    Route::get('/', 'App\Http\Controllers\QuestionController@all')->name('question.all');
    Route::post('/', 'App\Http\Controllers\QuestionController@store')->name('question.store');
    Route::post('/save', 'App\Http\Controllers\QuestionController@save')->name('question.save')->middleware('auth:api');
    Route::post('/delete', 'App\Http\Controllers\QuestionController@destory')->name('question.destroy');
});

Route::group([ 'prefix' => 'questionanswer'], function () {
    Route::get('/', 'App\Http\Controllers\QuestionAnswerController@all')->name('questionanswer.all');
    Route::post('/', 'App\Http\Controllers\QuestionAnswerController@store')->name('questionanswer.store');
    Route::post('/save', 'App\Http\Controllers\QuestionAnswerController@save')->name('questionanswer.save');
    Route::get('/{questionanswer}', 'App\Http\Controllers\QuestionAnswerController@show')->name('questionanswer.show');
    Route::put('/{questionanswer}', 'App\Http\Controllers\QuestionAnswerController@update')->name('questionanswer.update');
    Route::delete('/{questionanswer}', 'App\Http\Controllers\QuestionAnswerController@destory')->name('questionanswer.destroy');
});

Route::group([ 'prefix' => 'quizzanswer'], function () {
    Route::get('/', 'App\Http\Controllers\QuizzAnswerController@all')->name('quizzanswer.all');
    Route::post('/', 'App\Http\Controllers\QuizzAnswerController@store')->name('quizzanswer.store');
    Route::post('/save', 'App\Http\Controllers\QuizzAnswerController@save')->name('quizzanswer.save');
    Route::get('/{quizzanswer}', 'App\Http\Controllers\QuizzAnswerController@show')->name('quizzanswer.show');
    Route::put('/{quizzanswer}', 'App\Http\Controllers\QuizzAnswerController@update')->name('quizzanswer.update');
    Route::delete('/{quizzanswer}', 'App\Http\Controllers\QuizzAnswerController@destory')->name('quizzanswer.destroy');
});

Route::group([ 'prefix' => 'quizzresults'], function () {
    Route::post('/results', 'App\Http\Controllers\QuizzResultController@getresults')->name('quizzresults.getresults');
    Route::post('/result', 'App\Http\Controllers\QuizzResultController@getresult')->name('quizzresults.getresult');
  });

  Route::group([ 'prefix' => 'quizz'], function () {
    Route::post('/', 'App\Http\Controllers\QuizzController@all')->name('quizz.all');
    Route::post('/save', 'App\Http\Controllers\QuizzController@save')->name('quizz.save')->middleware('auth:api');
    Route::post('/update', 'App\Http\Controllers\QuizzController@update')->name('quizz.update')->middleware('auth:api');
    Route::post('/show', 'App\Http\Controllers\QuizzController@show')->name('quizz.show');
    Route::put('/{quizz}', 'App\Http\Controllers\QuizzController@update')->name('quizz.update');
    Route::post('/delete', 'App\Http\Controllers\QuizzController@destroy')->name('quizz.destroy');
});

