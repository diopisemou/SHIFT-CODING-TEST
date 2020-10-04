<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class QuestionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Question::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'question_string' => $this->faker->name,
            'question_label' => $this->faker->name,
            'question_dimension' => $this->faker->name,
            'question_direction' => $this->faker->name,
            'question_meaning' => $this->faker->name,
            'min_value' => 1,
            'max_value' => 7,
            'question_meaning' => $this->faker->name,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
