<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Notifications\Notifiable;

class QuestionAnswer extends Model
{
    use HasFactory, Notifiable;

    protected $user_id;
    protected $question_id;
    protected $quizzanswer_id;
    protected $question_value;
    protected $dates = ['created_at','updated_at','deleted_at'];
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'question_id',
        'question_value',
        'quizzanswer_id',
    ];

    public function creatoruser()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function question()
    {
        return $this->belongsTo('App\Models\Question', 'question_id', 'id');
    }

    public function quizzanswer()
    {
        return $this->belongsTo('App\Models\QuizzAnswer', 'quizzanswer_id', 'id');
    }
}
