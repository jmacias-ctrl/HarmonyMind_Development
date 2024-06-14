<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recomendaciones;
use Illuminate\Support\Facades\DB;
class RecomendacionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('recomendaciones')->insert([
            'emocion' => 'tristeza',
            'nivel'=> 7,
            'recomendacion' => 'Considera estrategias simples, como comer saludable, hacer ejercicio y sacar tiempo para descansar. Tómate tiempo para ti mismo. Acepta tus éxitos. Estás haciendo lo mejor que puedes. ',
        ]);

        DB::table('recomendaciones')->insert([
            'emocion' => 'tristeza',
            'nivel'=> 10,
            'recomendacion' => 'Comunícate con las personas con las que deseas estar cerca. Llama por teléfono o video chat, o envía mensajes de texto a tus amigos, familiares, vecinos y compañeros de trabajo.',
        ]);

        DB::table('recomendaciones')->insert([
            'emocion' => 'ira',
            'nivel'=> 10,
            'recomendacion' => 'Tan pronto puedas pensar con claridad, expresa tu frustración de una manera asertiva, pero sin generar confrontación. Habla de tus preocupaciones y necesidades de forma clara y directa, sin lastimar a otros ni tratar de controlarlos.',
        ]);

        DB::table('recomendaciones')->insert([
            'emocion' => 'ira',
            'nivel' => 7,
            'recomendacion' => 'Cuando estás enojado, es más fácil decir algo que luego lamentarás. Tómate unos momentos para ordenar tus pensamientos antes de decir algo. Esto también permite que las otras personas involucradas en la situación hagan lo mismo.'
        ]);

        DB::table('recomendaciones')->insert([
            'emocion' => 'felicidad',
            'nivel' => 5,
            'recomendacion' => 'La vida es tan incierta, que la felicidad debe aprovecharse en el momento en que se presenta. - Alexandre Dumas'
        ]);

        DB::table('recomendaciones')->insert([
            'emocion' => 'asco',
            'nivel' => 8,
            'recomendacion' => 'Se recomienda evitar los objetos o situaciones nocivas'
        ]);

        DB::table('recomendaciones')->insert([
            'emocion' => 'miedo',
            'nivel' => 7,
            'recomendacion' => 'Para superar el miedo, es muy importante aceptarlo, en vez de luchar contra él o negar que nos sentimos asustados'
        ]);

        DB::table('recomendaciones')->insert([
            'emocion' => 'miedo',
            'nivel' => 9,
            'recomendacion' => ' Si no sabes muy bien cómo manejar toda esta situación, conversa con un adulto sobre cómo te sientes. Puede ser un padre, un maestro, un entrenador o alguien en quien confíes.'
        ]);

        DB::table('recomendaciones')->insert([
            'emocion' => 'sorpresa',
            'nivel' => 6,
            'recomendacion' => 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed placeat vitae obcaecati fugit voluptatum, autem sapiente aut cumque maiores delectus nisi id accusamus cum debitis dolor veritatis aperiam omnis officiis.' 
        ]);
    }
}
