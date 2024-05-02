<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class adminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => 'asdf1234',
        ]);

        DB::table('users')->insert([
            'name' => 'test2',
            'email' => 'test2@gmail.com',
            'password' => 'asdf1234',
        ]);

        DB::table('categories')->insert([
            'id' => '1',
            'nombre' => 'catTest1',
        ]);

        DB::table('categories')->insert([
            'id' => '2',
            'nombre' => 'catTest2',
        ]);

        DB::table('events')->insert([
            'nombre' => 'Evento 1',
            'descripcion' => 'Lorem ipsum, dolor sit amet',
            'fecha' => Carbon::now()->format('Y-m-d H:i:s'),
            'organizador' => 'org',
            'tipo' => 'test',
            'category_fk' =>'1'
        ]);

        DB::table('events')->insert([
            'nombre' => 'Evento 2',
            'descripcion' => 'Lorem ipsum, dolor sit amet',
            'fecha' => Carbon::now()->format('Y-m-d H:i:s'),
            'organizador' => 'org',
            'tipo' => 'test',
            'category_fk' =>'2'
        ]);

        DB::table('relations')->insert([
            'user_fk' => '1',
            'event_fk' => '1',
        ]);

        DB::table('relations')->insert([
            'user_fk' => '1',
            'event_fk' => '2',
        ]);
    }
}
