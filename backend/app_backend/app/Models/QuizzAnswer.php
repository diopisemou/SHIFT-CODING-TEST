<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Notifications\Notifiable;

class QuizzAnswer extends Model
{
    use HasFactory, Notifiable;

    protected $user_id;
    protected $quizz_id;
    protected $quizzresult_id;
    protected $user_email;
    protected $user_name;
    protected $perspective_string;
    protected $perspective_results;
    protected $dates = ['created_at','updated_at','deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'quizz_id',
        'quizzresult_id',
        'user_email',
        'user_name',
        'perspective_string',
    ];


    public function creatoruser()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function quizz()
    {
        return $this->belongsTo('App\Models\Quizz','id','quizz_id');
    }

    public function quizzresult()
    {
        return $this->belongsTo('App\Models\Quizz','quizzresult_id','id');
    }

    public function answers()
    {
        return $this->hasMany('App\Models\QuestionAnswer','quizzanswer_id','id');
    }

    public function questionsanswers()
    {
        return $this->hasManyThrough('App\Models\QuestionAnswer','App\Models\Question');
    }


}
