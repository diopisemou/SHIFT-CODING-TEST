<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Notifications\Notifiable;

class Quizz extends Model
{
    use HasFactory, Notifiable;

    protected $user_id;
    protected $quizz_name;
    protected $quizz_active;

    protected $dates = ['created_at','updated_at','deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'quizz_name',
        'quizz_active',
    ];

    public function creatoruser()
    {
        return $this->belongsTo('App\Models\User');
    }


    public function results()
    {
        return $this->hasMany('App\Models\QuizzResults', 'quizz_id', 'id');
    }

    public function questions()
    {
        return $this->belongsToMany('App\Models\Question');
    }

    public function quizzanswers()
    {
        return $this->hasManyThrough('App\Models\QuizzAnswer','App\Models\QuizzResult');
    }
}
