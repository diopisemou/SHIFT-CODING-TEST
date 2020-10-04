<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Notifications\Notifiable;


class Question extends Model
{
    use HasFactory, Notifiable;

    protected $dates = ['created_at','updated_at','deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'question_string',
        'question_label',
        'question_dimension',
        'question_direction',
        'question_meaning',
        'min_value',
        'max_value',
    ];

    protected $name;
    protected $question_string;
    protected $question_label;
    protected $question_dimension;
    protected $question_direction;
    protected $question_meaning;
    protected $min_value;
    protected $max_value;


    public function quizzs()
    {
        return $this->belongsToMany('App\Models\Quizz');
    }

    public function questionanswers()
    {
        return $this->hasMany('App\Models\QuestionAnswer', 'question_id', 'id');
    }
}
