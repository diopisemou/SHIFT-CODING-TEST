<?php

namespace Database\Factories;

use App\Models\Quizz;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class QuizzFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Quizz::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'quizz_name' => $this->faker->name,
            'quizz_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
