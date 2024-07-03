<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class ExpertoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('experts')->insert([
            'nombre' => 'Armando Casas',
            'rut'=> "18.487.871-K",
            'profesion' => 'Psicólogo',
            'modalidad' => 'Online por Zoom'
        ]);

        DB::table('experts')->insert([
            'nombre' => 'Ernesto Padilla',
            'rut'=> "19.321.432-8",
            'profesion' => 'Psicólogo',
            'modalidad' => 'Online por Zoom'
        ]);

        DB::table('experts')->insert([
            'nombre' => 'Pedro Salinas',
            'rut'=> "17.321.431-9",
            'profesion' => 'Psicólogo',
            'modalidad' => 'Online por Zoom'
        ]);
        for($i=1; $i<=3; $i++){
            DB::table('schedules')->insert([
                'expert_fk'=>$i,
                'hora'=>"9:30"
            ]);
            DB::table('schedules')->insert([
                'expert_fk'=>$i,
                'hora'=>"10:30"
            ]);
            DB::table('schedules')->insert([
                'expert_fk'=>$i,
                'hora'=>"11:30"
            ]);
        }
    }
}
