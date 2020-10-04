<?php

namespace App\Http\Controllers;

use App\Models\QuizzAnswer;
use App\Models\QuizzResult;
use App\Models\QuestionAnswer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class QuizzAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function index()
    {
        $quizzanswers = QuizzAnswer::all();
        return response()->json($quizzanswers);
    }

    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function all()
    {
        $quizzanswers = QuizzAnswer::all();
        return response()->json($quizzanswers);
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
        
        
        $qanswers = [];
        for ($i=0; $i < count($request->answers); $i++) { 
            $qanswer = $request->answers[$i];
            array_push($qanswers, $qanswer);
        }

        $user = User::where('email','=',$request->email)->first();
        if ($user == null) {
            $user = User::create(array('name' => $request->name, 'email' => $request->email, 'email_verified_at' => now(), 'password' => bcrypt('Azerty123@#'),'remember_token' => Str::random(10)));
        }

        $allResultArray = $this->calculateQuizzResult($qanswers);
        
        $quizzresult = QuizzResult::create([
            "user_email" => $request->email,
            "user_name" => $request->name,
            "quizz_id" => $request->quizz_id,
            "result_string" => $allResultArray['result_string'],
            "function1" => $allResultArray['functionsArray']['func1'],
            "function2" => $allResultArray['functionsArray']['func2'],
            "function3" => $allResultArray['functionsArray']['func3'],
            "function4" => $allResultArray['functionsArray']['func4'],
            "created_at" => now(),
            "updated_at" => now(),
            ]);

        $quizzanswer = QuizzAnswer::create([
            "quizzresult_id" => $quizzresult->id,
            "user_email" => $request->email,
            "user_name" => $request->name,
            "quizz_id" => $request->quizz_id,
            "created_at" => now(),
            "updated_at" => now(),
            ]);
        $qanswers = [];
        for ($i=0; $i < count($request->answers); $i++) { 
            $qanswer = $request->answers[$i];
            array_push($qanswers, $qanswer);
            QuestionAnswer::create([
                "quizzanswer_id" => $quizzanswer->id,
                "question_id" => intval(substr($qanswer[0], 8)),
                "question_value" => $qanswer[1],
                "created_at" => now(),
                "updated_at" => now(),
                ]);
        }
        return response()->json(['message'=> 'answer created',
        'quizzanswer' => "true",
        'dataPoints' => $allResultArray['dataPoints'],
        'quizzresult' => $quizzresult]);
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
        $quizzanswer = QuizzAnswer::create($request->all());
        return response()->json(['message'=> 'question created', 
        'question' => $quizzanswer]);
    }

    /**
     * Display the specified resource.
     *
     * @param  QuizzAnswer  $questionanswer
     * @return IlluminateHttpResponse
     */
    public function show(QuizzAnswer $quizzanswer)
    {
        return $quizzanswer;
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @param  QuizzAnswer  $question
     * @return IlluminateHttpResponse
     */
    public function update(Request $request, QuizzAnswer $quizzanswer)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'description' => 'required' //optional if you want this to be required
        ]);
        $quizzanswer->name = $request->name();
        $quizzanswer->amount = $request->amount();
        $quizzanswer->description = $request->description();
        $quizzanswer->save();
        
        return response()->json([
            'message' => 'quizz answer updated!',
            'question' => $quizzanswer
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  QuizzAnswer  $quizzanswer
     * @return IlluminateHttpResponse
     */
    public function destroy(QuizzAnswer $quizzanswer)
    {
        $quizzanswer->delete();
        return response()->json([
            'message' => 'question deleted'
        ]);
        
    }

    private function calculateQuizzResult($answerarray)
    {
        
        $questions = [];
        for ($i=0; $i < count($answerarray); $i++) { 
            $qanswer = $answerarray[$i];
            $qId = intval(substr($qanswer[0], 8));
            $result =  \App\Models\Question::where('id','=',$qId)->firstOrFail();
            array_push($questions, $result);
        }

        $dimensionArray = $this->calculateTotalDimensions($answerarray);

        $result_string = $this->getResultString($dimensionArray);

        $dataPoints = $dimensionArray['dataPoints'];

        $functionsArray = $this->getFunctionsArray($result_string);

        $allResultArray = array(
            "dataPoints"=>$dataPoints,
            "result_string"=>$result_string,
            "functionsArray"=>$functionsArray);

        return $allResultArray;
    }

    private function calculateTotalDimensions($answerarray)
    {
        
        $questions = [];
        for ($i=0; $i < count($answerarray); $i++) { 
            $qanswer = $answerarray[$i];
            $qId = intval(substr($qanswer[0], 8));
            $result = \App\Models\Question::where('id','=',$qId)->firstOrFail();
            array_push($questions, $result);
        }

        $total_E = 0; 
        $total_I = 0; 
        $total_S = 0; 
        $total_N = 0; 
        $total_T = 0; 
        $total_F = 0; 
        $total_J = 0; 
        $total_P = 0; 

        for($i = 0; $i < count($answerarray); ++$i) {

            $ansval = intval(substr($answerarray[$i][1], 0));
            $qmeaning = $questions[$i]['question_meaning'];
            $qdirection = $questions[$i]['question_direction'];
            $qmaxval = $questions[$i]['max_value'];
            $qfactor = intval(substr($qdirection, 0));
            
            switch($qmeaning)
            {
                case('E'):
                    $total_E += ($ansval)*$qfactor;
                    $total_I += ($qmaxval - $ansval)*$qfactor;
                    break;
                case('I'):
                    $total_I += ($ansval)*$qfactor;
                    $total_E +=  ($qmaxval - $ansval)*$qfactor;
                    break;
                case('S'):
                    $total_S += ($ansval)*$qfactor;
                    $total_N +=  ($qmaxval - $ansval)*$qfactor;
                    break;
                case('N'):
                    $total_N += ($ansval)*$qfactor;
                    $total_S +=  ($qmaxval - $ansval)*$qfactor;
                    break;
                case('T'):
                    $total_T += ($ansval)*$qfactor;
                    $total_F +=  ($qmaxval - $ansval)*$qfactor;
                    break;
                case('F'):
                    $total_F += ($ansval)*$qfactor;
                    $total_T +=  ($qmaxval - $ansval)*$qfactor;
                    break;
                case('J'):
                    $total_J += ($ansval)*$qfactor;
                    $total_P +=  ($qmaxval - $ansval)*$qfactor;
                    break;
                case('P'):
                    $total_P += ($ansval)*$qfactor;
                    $total_J +=  ($qmaxval - $ansval)*$qfactor;
                    break;
            }

        }

        $total_E = abs($total_E); 
        $total_I = abs($total_I); 
        $total_S = abs($total_S); 
        $total_N = abs($total_N); 
        $total_T = abs($total_T); 
        $total_F = abs($total_F); 
        $total_J = abs($total_J); 
        $total_P = abs($total_P); 

        $sum_total = $total_E + $total_I + $total_S + $total_N + 
        $total_T + $total_F + $total_J + $total_P;
        $sum_total = $sum_total == 0 ? 1 : $sum_total;
        
        
        $dataPoints = array(
            array("label"=>"I", "y" => $total_I/$sum_total*100),
            array("label"=>"E", "y"=> $total_E/$sum_total*100),
            array("label"=>"S", "y"=> $total_S/$sum_total*100),
            array("label"=>"N", "y"=> $total_N/$sum_total*100),
            array("label"=>"T", "y"=> $total_T/$sum_total*100),
            array("label"=>"F", "y"=> $total_F/$sum_total*100),
            array("label"=>"J", "y"=> $total_J/$sum_total*100),
            array("label"=>"P", "y"=> $total_P/$sum_total*100)
        );


        $resultArray = array(
                    "total_E"=>$total_E,
                    "total_I"=>$total_I,
                    "total_S"=>$total_S,
                    "total_N"=>$total_N,
                    "total_T"=>$total_T,
                    "total_F"=>$total_F,
                    "total_J"=>$total_J,
                    "total_P"=>$total_P,
                    "sum_total"=>$sum_total,
                    "dataPoints"=>$dataPoints);

        return $resultArray;
    }

    private function getResultString($dimensionArray)
    {
        
            $result_string = "";
            $total_E = intval(substr($dimensionArray['total_E'], 0)); 
            $total_I = intval(substr($dimensionArray['total_I'], 0)); 
            $total_S = intval(substr($dimensionArray['total_S'], 0)); 
            $total_N = intval(substr($dimensionArray['total_N'], 0)); 
            $total_T = intval(substr($dimensionArray['total_T'], 0)); 
            $total_F = intval(substr($dimensionArray['total_F'], 0)); 
            $total_J = intval(substr($dimensionArray['total_J'], 0)); 
            $total_P = intval(substr($dimensionArray['total_P'], 0)); 

            if( ($total_E > $total_I ) || ( $total_E == $total_I ))
            {
                $result_string .= "E";
            }
            else
            {
                $result_string .= "I";
            }

            if( ($total_S > $total_N ) || ( $total_S == $total_N ))
            {
                $result_string .= "S";
            }
            else
            {
                $result_string .= "N";
            }

            if( ($total_T > $total_F ) || ( $total_T == $total_F ))
            {
                $result_string .= "T";
            }
            else
            {
                $result_string .= "F";
            }

            if( ($total_J > $total_P ) || ( $total_J == $total_P ))
            {
                $result_string .= "J";
            }
            else
            {
                $result_string .= "P";
            }

        return $result_string;
    }

    private function getFunctionsArray($result_string)
    {
        
        $result_string_array = str_split($result_string);

            $func1 = "";
            $func2 = "";
            $func3 = "";
            $func4 = "";

            foreach($result_string_array as $char)
            {
                switch($char)
                {
                    case("E"):
                        $func1 .= "Extraversion";
                        break;
                    case("I"):
                        $func1 .= "Introversion";
                        break;
                    case("S"):
                        $func2 .= "Sensing";
                        break;
                    case("N"):
                        $func2 .= "Intuition";
                        break;
                    case("T"):
                        $func3 .= "Thinking";
                        break;
                    case("F"):
                        $func3 .= "Feeling";
                        break;
                    case("J"):
                        $func4 .= "Judging";
                        break;
                    case("P"):
                        $func4 .= "Perceiving";
                        break;
                }
            }

            $functionsArray = array(
                "func1"=>$func1,
                "func2"=>$func2,
                "func3"=>$func3,
                "func4"=>$func4);

        return $functionsArray;
    }
}
