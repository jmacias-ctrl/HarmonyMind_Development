<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Learning;
use Carbon\Carbon;

class LearningSeeder extends Seeder
{
    public function run()
    {
        $learning = [
            [
                'titulo' => 'Introducción a la Psicología',
                'descripcion' => 'Un curso básico sobre los principios de la psicología. En este curso, exploraremos los conceptos fundamentales de la psicología, incluyendo la historia de la disciplina, las teorías principales, y las aplicaciones prácticas. Aprenderás sobre los diferentes enfoques psicológicos, desde el conductismo hasta el psicoanálisis, y cómo estos enfoques se utilizan para entender y mejorar el comportamiento humano. Además, examinaremos estudios de caso y experimentos famosos que han ayudado a dar forma a nuestra comprensión de la mente humana.',
                'fecha_publicacion' => Carbon::now()->subDays(10),
                'categoria_learning_id' => 1,
            ],
            [
                'titulo' => 'Técnicas de Relajación',
                'descripcion' => 'Aprende técnicas para reducir el estrés y mejorar tu bienestar. Este curso te guiará a través de una variedad de métodos de relajación, incluyendo la meditación, la respiración profunda, y la relajación muscular progresiva. Discutiremos cómo y cuándo utilizar estas técnicas para maximizar su efectividad y cómo integrarlas en tu rutina diaria para obtener beneficios a largo plazo. También exploraremos la ciencia detrás de la relajación y cómo puede influir positivamente en tu salud mental y física.',
                'fecha_publicacion' => Carbon::now()->subDays(5),
                'categoria_learning_id' => 2,
            ],
            [
                'titulo' => 'Canales de YouTube Recomendados para Aprender',
                'descripcion' => 'Una lista de los mejores canales de YouTube para aprender sobre diversos temas. Este recurso es perfecto para aquellos que buscan ampliar sus conocimientos a través de contenido accesible y de alta calidad. Hemos recopilado canales que cubren una amplia gama de temas, desde ciencias y matemáticas hasta historia y arte. Cada canal seleccionado ofrece lecciones bien estructuradas, presentaciones claras y contenido actualizado que te mantendrá comprometido y motivado a aprender más.',
                'fecha_publicacion' => Carbon::now(),
                'categoria_learning_id' => 3,
            ],
        ];

        Learning::insert($learning);
    }
}
