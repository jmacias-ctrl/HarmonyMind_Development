<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CategoriaLearning;

class CategoriaLearningSeeder extends Seeder
{
    public function run()
    {
        CategoriaLearning::insert([
            ['nombre_categoria' => 'Psicología'],
            ['nombre_categoria' => 'Relajación'],
            ['nombre_categoria' => 'Canales Recomendados'],
        ]);
    }
}
