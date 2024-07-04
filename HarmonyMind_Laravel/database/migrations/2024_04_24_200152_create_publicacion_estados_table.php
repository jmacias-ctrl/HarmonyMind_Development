<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePublicacionEstadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('publicacion_estados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');
            $table->string('publicacion');
            $table->integer('tristeza');
            $table->integer('felicidad');
            $table->integer('disgusto');
            $table->integer('ira');
            $table->integer('miedo');
            $table->integer('sorpresa');
            $table->enum('estado_de_animo', ['miedo', 'ira', 'sorpresa', 'felicidad', 'tristeza', 'asco']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('publicacion_estados');
    }
}
