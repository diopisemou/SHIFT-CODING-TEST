<?php

namespace App\Http\Controllers;

use App\Models\QuizzResult;
use Illuminate\Http\Request;

class QuizzResultController extends Controller
{
    

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getresult(Request $request)
    {
        //
        $request->validate([
            'email' => 'required',
            'quizz_id' => 'required',
        ]);
        $queryresults = QuizzResult::with('quizzanswers.answers.question')->where('user_email', '=', $request->email)->where('quizz_id', '=', $request->quizz_id)->orderBy('created_at')->firstOrFail();
        return response()->json(['message'=> 'results found', 'quizzresults' => $queryresults]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getresults(Request $request)
    {
        //
        $request->validate([
            'email' => 'required',
        ]);
        $queryresults = QuizzResult::with('quizzanswers.answers.question')->where('user_email', '=', $request->email)->orderBy('created_at')->get();
        return response()->json([
            'message'=> 'results found',
            'quizzresults' => $queryresults]);
    }

    
}
