<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\User;

class adminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
            $user->name = 'test';
            $user->email = 'test@test.cl';
            $user->password = bcrypt('asdf1234');
            $user->emergency_contact = 1;
        $user->save();

        $user = new User();
            $user->name = 'test2';
            $user->email = 'test2@test.cl';
            $user->password = bcrypt('asdf1234');
            $user->emergency_contact = 2;
        $user->save();
        

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
