<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->delete();
        \App\Models\User::factory(1)->create();
        \App\Models\User::create(array('email' => 'foo@bar.com'));
        \App\Models\User::create(array('email' => 'diopisemou@gmail.com', 'password' => 'B@chB0uch3', 'name' => 'Bachir'));
    }

}