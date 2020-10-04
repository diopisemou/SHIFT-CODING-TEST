<?php
namespace App\Http\Controllers;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function index()
    {
        $questions = Question::all();
        return response()->json($questions);
    }

    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function all()
    {
        $questions = Question::all();
        return response()->json(['message'=> 'questions fetched', 
        'questions' => $questions,
        'quizz_id' => 1]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function allFromQuizz(Request $request)
    {
        $request->validate([
            'quizz_id' => 'required'
        ]);

        $questions = Question::whereHas('quizzs', function($q,$request)
        {
            $q->where('id', '=', $request->quizz_id);
        
        })->get();
        
        return response()->json(['message'=> 'questions fetched', 
        'questions' => $questions,
        'quizz_id' => $request->quizz_id]);
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
            'name' => 'required',
            'question_string' => 'required',
            'question_label' => 'required',
            'question_dimension' => 'required',
            'question_direction' => 'required',
            'question_meaning' => 'required',
            'min_value' => 'required',
            'max_value' => 'required',
        ]);
        
        $question = Question::create($request->all());
        return response()->json(['message'=> 'question created', 
        'question' => $question]);
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
        $question = Question::create($request->all());
        return response()->json(['message'=> 'question created', 
        'question' => $question]);
    }

    /**
     * Display the specified resource.
     *
     * @param  Question  $question
     * @return IlluminateHttpResponse
     */
    public function show(Question $question)
    {
        return $question;
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
     * @param  Question  $question
     * @return IlluminateHttpResponse
     */
    public function update(Request $request, Question $question)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'description' => 'required' //optional if you want this to be required
        ]);
        $question->name = $request->name();
        $question->amount = $request->amount();
        $question->description = $request->description();
        $question->save();
        
        return response()->json([
            'message' => 'question updated!',
            'question' => $question
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Question  $question
     * @return IlluminateHttpResponse
     */

    /**
     * Store a newly created resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @return IlluminateHttpResponse
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'q_id' => 'required',
        ]);

        $question = Question::where('id','=',$request->q_id)->firstOrFail();
        $question->delete();
        return response()->json([
            'message' => 'question deleted'
        ]);
    }
    
}