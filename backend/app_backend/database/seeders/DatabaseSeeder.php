<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        // $this->call('UserTableSeeder');

        // DB::table('users')->delete();
        \App\Models\User::factory(1)->create();
        $quizzs = \App\Models\Quizz::factory(1)->create();
        // \App\Models\Question::factory(5)->create();

        
        $this->addQuestions();
        $qIDS = [1,2,3,4,5,6,7,8,9,10];
        for ($i=0; $i < count($quizzs); $i++) { 
            # code...
            $quizz_create = $quizzs[$i];
            $quizz_create->questions()->attach($qIDS);
        }
        
        \App\Models\User::create(array('name' => 'Admin', 'email' => 'adminuser@gmail.com', 'email_verified_at' => now(), 'password' => bcrypt('Azerty123@#'),'isAdmin' => true,'remember_token' => Str::random(10)));
        \App\Models\User::create(array('name' => 'TestUser', 'email' => 'testuser@gmail.com', 'email_verified_at' => now(), 'password' => bcrypt('Azerty123@#'),'isAdmin' => false,'remember_token' => Str::random(10)));

        $this->command->info('User table seeded!');
    }

    private function addQuestions()
    {
        \App\Models\Question::create(array(
            'name' => 'Q1',
            'question_string' => 'You find it takes effort to introduce yourself to other people.', 
            'question_label' => 'You find it takes effort to introduce yourself to other people.', 
            'question_dimension' => 'EI',
            'question_direction' => '1',
            'question_meaning' => 'I',
            'min_value' => 1,
            'max_value' => 7,
            'created_at' => now(),
            'updated_at' => now()));
        
        \App\Models\Question::create(array(
            'name' => 'Q2',
            'question_string' => 'You consider yourself more practical than creative.', 
            'question_label' => 'You consider yourself more practical than creative.',  
            'question_dimension' => 'SN',
            'question_direction' => '-1',
            'question_meaning' => 'S',
            'min_value' => 1,
            'max_value' => 7,
            'created_at' => now(),
            'updated_at' => now()));
        
        \App\Models\Question::create(array(
            'name' => 'Q3',
            'question_string' => 'Winning a debate matters less to you than making sure no one gets upset.', 
            'question_label' => 'Winning a debate matters less to you than making sure no one gets upset.', 
            'question_dimension' => 'TF',
            'question_direction' => '1',
            'question_meaning' => 'F',
            'min_value' => 1,
            'max_value' => 7,
            'created_at' => now(),
            'updated_at' => now()));
            
        \App\Models\Question::create(array(
            'name' => 'Q4',
            'question_string' => 'You get energized going to social events that involve many interactions.', 
            'question_label' => 'You get energized going to social events that involve many interactions.', 
            'question_dimension' => 'EI',
            'question_direction' => '-1',
            'question_meaning' => 'E',
            'min_value' => 1,
            'max_value' => 7,
            'created_at' => now(),
            'updated_at' => now()));
        
        \App\Models\Question::create(array(
            'name' => 'Q5',
            'question_string' => 'You often spend time exploring unrealistic and impractical yet intriguing ideas.', 
            'question_label' => 'You often spend time exploring unrealistic and impractical yet intriguing ideas.', 
            'question_dimension' => 'SN',
            'question_direction' => '1',
            'question_meaning' => 'N',
            'min_value' => 1,
            'max_value' => 7,
            'created_at' => now(),
            'updated_at' => now()));
        
        \App\Models\Question::create(array(
            'name' => 'Q6',
            'question_string' => 'Deadlines seem to you to be of relative rather than absolute importance.', 
            'question_label' => 'Deadlines seem to you to be of relative rather than absolute importance.', 
            'question_dimension' => 'JP',
            'question_direction' => '1',
            'question_meaning' => 'P',
            'min_value' => 1,
            'max_value' => 7,
            'created_at' => now(),
            'updated_at' => now()));
        
        \App\Models\Question::create(array(
            'name' => 'Q7',
            'question_string' => 'Logic is usually more important than heart when it comes to making important decisions.', 
            'question_label' => 'Logic is usually more important than heart when it comes to making important decisions.', 
            'question_dimension' => 'TF',
            'question_direction' => '-1',
            'question_meaning' => 'T',
            'min_value' => 1,
            'max_value' => 7,
            'created_at' => now(),
            'updated_at' => now()));
            
        \App\Models\Question::create(array(
            'name' => 'Q8',
            'question_string' => 'Your home and work environments are quite tidy.', 
            'question_label' => 'Your home and work environments are quite tidy.', 
            'question_dimension' => 'JP',
            'question_direction' => '-1',
            'question_meaning' => 'J',
            'min_value' => 1,
            'max_value' => 7,
            'created_at' => now(),
            'updated_at' => now()));
        
        \App\Models\Question::create(array(
            'name' => 'Q9',
            'question_string' => 'You do not mind being at the center of attention.', 
            'question_label' => 'You do not mind being at the center of attention.', 
            'question_dimension' => 'EI',
            'question_direction' => '-1',
            'question_meaning' => 'E',
            'min_value' => 1,
            'max_value' => 7,
            'created_at' => now(),
            'updated_at' => now()));
            
        \App\Models\Question::create(array(
            'name' => 'Q10',
            'question_string' => 'Keeping your options open is more important than having a to-do list.', 
            'question_label' => 'Keeping your options open is more important than having a to-do list.', 
            'question_dimension' => 'JP',
            'question_direction' => '1',
            'question_meaning' => 'P',
            'min_value' => 1,
            'max_value' => 7,
            'created_at' => now(),
            'updated_at' => now()));
    }

    
}
