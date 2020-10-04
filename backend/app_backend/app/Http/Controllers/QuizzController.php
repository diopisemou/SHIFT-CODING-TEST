<?php

namespace App\Http\Controllers;

use App\Models\Quizz;
use Illuminate\Http\Request;

class QuizzController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function index()
    {
        $quizzs = Quizz::all();
        return response()->json($quizzs);
    }

    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function all()
    {
        $quizzs = Quizz::with('questions')->orderBy('created_at')->get();
        return response()->json($quizzs);
    }

    /**
     * Display the specified resource.
     *
     * @param  Quizz  $questionanswer
     * @return IlluminateHttpResponse
     */
    public function show(Request $request)
    {
         //
         $request->validate([
            'quizz_id' => 'required',
        ]);

        $queryresults = Quizz::with('questions')->where('id', '=', $request->quizz_id)->orderBy('created_at')->firstOrFail();
        return response()->json([
            'message'=> 'results found',
            'quizz' => $queryresults]);
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
            'quizz_name' => 'required',
            'quizz_active' => 'required',
        ]);
        
        

        $quizz = Quizz::create([
            "quizz_name" => $request->quizz_name,
            "quizz_active" => $request->quizz_active,
            "created_at" => now(),
            "updated_at" => now(),
            ]);
        
        //$quizz->questions()->sync($qIDS);
        //$quizz->questions()->attach();
        //$quizz->questions()->sync(array(1, 2, 3));
        
        return response()->json(['message'=> 'quizz created',
        'quizzcreated' => "true",
        'quizz' => $quizz]);
    }

    /**
     * Store an updated resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @return IlluminateHttpResponse
     */
    public function update(Request $request)
    {
        $request->validate([
            'quizz_id' => 'required',
            'quizz_name' => 'required',
            'quizz_active' => 'required',
            'questions_id' => 'required',
        ]);
        
        $qIDS = [];
        for ($i=0; $i < count($request->questions_id); $i++) { 
            $questionToAdd = $request->questions_id[$i];
            array_push($qIDS, $questionToAdd);
        }

        $quizz = Quizz::where('id', '=', $request->quizz_id)->firstOrFail();
        $quizz->questions()->sync($qIDS);
        $quizz->update(['quizz_name' => $request->quizz_name,
        'updated_at' => now(),
        'quizz_active' => $request->quizz_active]);

        
        return response()->json(['message'=> 'quizz updated',
        'quizz' => $quizz]);
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  QuizzAnswer  $quizzanswer
     * @return IlluminateHttpResponse
     */
    public function destroy(Request $request )
    {
        $request->validate([
            'quizz_id' => 'required', 
        ]);
        $quizz_id = $request->quizz_id;
        $quizz = Quizz::where('id', '=', $quizz_id)->firstOrFail();
        $quizz->delete();
        return response()->json([
            'message' => 'quizz deleted'
        ]);
        
    }
}
