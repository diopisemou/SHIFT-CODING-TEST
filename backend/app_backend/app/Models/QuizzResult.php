<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Notifications\Notifiable;
use App\Models\QuizzAnswer;

class QuizzResult extends Model
{
    use HasFactory, Notifiable;

    protected $user_id ;
    protected $user_email ;
    protected $user_name ;
    protected $quizz_id ;
    protected $result_string ;
    protected $function1 ;
    protected $function2 ;
    protected $function3 ;
    protected $function4 ;

    protected $dates = ['created_at','updated_at','deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_email',
        'user_name',
        'quizz_id',
        'result_string',
        'function1',
        'function2',
        'function3',
        'function4',
    ];

    public function creatoruser()
    {
        return $this->belongsTo('App\Models\User', 'id', 'user_email');
    }

    public function quizz()
    {
        return $this->belongsTo('App\Models\Quizz', 'quizz_id', 'id');
    }

    public function quizzanswers()
    {
        return $this->hasMany('App\Models\QuizzAnswer','id','id');
    }

    public function useranswers()
    {
        return $this->hasManyThrough('App\Models\QuestionAnswer','App\Models\QuizzAnswer');
    }

    
}
