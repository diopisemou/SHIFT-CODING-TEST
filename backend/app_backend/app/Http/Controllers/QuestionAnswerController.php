<?php

namespace App\Http\Controllers;

use App\Models\QuestionAnswer;
use Illuminate\Http\Request;

class QuestionAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function index()
    {
        $questionanswers = QuestionAnswer::all();
        return response()->json($questionanswers);
    }

    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function all()
    {
        $questionanswers = QuestionAnswer::all();
        return response()->json($questionanswers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @return IlluminateHttpResponse
     */
    public function save(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'name' => 'required',
            'answers' => 'required',
            'quizz_id' => 'required',
        ]);
        
        for ($i=0; $i < count($request->answers); $i++) { 
            $qanswer = $request->answers[$i];
            QuestionAnswer::create([
                "user_email" => $request->email,
                "user_name" => $request->name,
                "quizz_id" => $request->quizz_id,
                "question_id" => intval(substr($qanswer[0], -1)),
                "question_value" => $qanswer[1],
                "created_at" => now(),
                "updated_at" => now(),
                ]);
        }
        //$questionanswer = QuestionAnswer::create($request->all());
        //return response()->json(['message'=> 'question created', 'questionanswer' => $questionanswer]);
        return response()->json(['message'=> 'question created', 'questionanswer' => "true"]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @return IlluminateHttpResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'description' => 'required' //optional if you want this to be required
        ]);
        $questionanswer = QuestionAnswer::create($request->all());
        return response()->json(['message'=> 'question created', 
        'question' => $questionanswer]);
    }

    /**
     * Display the specified resource.
     *
     * @param  QuestionAnswer  $questionanswer
     * @return IlluminateHttpResponse
     */
    public function show(QuestionAnswer $questionanswer)
    {
        return $questionanswer;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Question  $question
     * @return IlluminateHttpResponse
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @param  QuestionAnswer  $question
     * @return IlluminateHttpResponse
     */
    public function update(Request $request, QuestionAnswer $questionanswer)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'description' => 'required' //optional if you want this to be required
        ]);
        $questionanswer->name = $request->name();
        $questionanswer->amount = $request->amount();
        $questionanswer->description = $request->description();
        $questionanswer->save();
        
        return response()->json([
            'message' => 'question updated!',
            'question' => $questionanswer
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  QuestionAnswer  $questionanswer
     * @return IlluminateHttpResponse
     */
    public function destroy(QuestionAnswer $questionanswer)
    {
        $questionanswer->delete();
        return response()->json([
            'message' => 'question deleted'
        ]);
        
    }
}
