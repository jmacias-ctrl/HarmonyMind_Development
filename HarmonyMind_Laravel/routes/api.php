<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\LearningController;
use App\Http\Controllers\Api\PublicacionEstadoController;
use App\Http\Controllers\Api\RecomendacionesController;
use App\Http\Controllers\Api\eventController;
use App\Http\Controllers\Api\contactController;
use App\Http\Controllers\Api\ExpertController;
use App\Http\Controllers\Api\CategoriaLearningController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('inicio', [PublicacionEstadoController::class, 'inicio'])->middleware('auth:api')->name('inicio');
Route::prefix('publicacion')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::post('create', [PublicacionEstadoController::class, 'crear_publicacion'])->name('crear.publicacion');
        Route::get('get', [PublicacionEstadoController::class, 'ver_publicaciones'])->name('ver.publicaciones');
        Route::post('modify', [PublicacionEstadoController::class, 'modificar_publicacion'])->name('modify.publicaciones');
        Route::post('delete', [PublicacionEstadoController::class, 'eliminar_publicacion'])->name('delete.publicaciones');
        Route::get('analisis', [PublicacionEstadoController::class, 'analisis_estados'])->name('analisis.publicaciones');
        Route::get('recomendacion', [RecomendacionesController::class, 'analisis_ultimo_estado'])->name('analisis_recomendacion');
    });
});

Route::prefix('evento')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('get', [eventController::class, 'index'])->name('ver.eventos');
        Route::post('assign', [eventController::class, 'assign'])->name('asignar.evento');
        Route::get('getassist', [eventController::class, 'index_assist'])->name('ver.eventos.registrados');
        Route::post('remove', [eventController::class, 'relation_remove'])->name('revomer.evento');
        
    });
});

Route::prefix('emergency_contact')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('get', [contactController::class, 'get'])->name('ver.contacto');
        Route::post('add', [contactController::class, 'add'])->name('agregar.contacto');
        Route::post('delete', [contactController::class, 'delete'])->name('eliminar.contacto');
        
        
    });
});

Route::prefix('expert_connection')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::post('set_appointment', [ExpertController::class, 'createAppointment'])->name('crear.cita');
        Route::get('get_appointments', [ExpertController::class, 'getAppointments'])->name('ver.citas');
        Route::get('get_schedules', [ExpertController::class, 'showSchedule'])->name('ver.horario');
        Route::get('get_experts', [ExpertController::class, 'showExperts'])->name('ver.expertos');
        
    });
});

Route::post('login', [LoginController::class, 'login']);
Route::post('register', [LoginController::class, 'register']);

Route::prefix('learning')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/', [LearningController::class, 'index'])->name('learning.index');
        Route::post('/', [LearningController::class, 'create'])->name('learning.create');
        Route::put('/{id}', [LearningController::class, 'update'])->name('learning.update');
        Route::delete('/{id}', [LearningController::class, 'delete'])->name('learning.delete');
    });
});

Route::prefix('categoria_learning')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/', [CategoriaLearningController::class, 'index'])->name('categoria_learning.index');
        Route::post('/', [CategoriaLearningController::class, 'create'])->name('categoria_learning.create');
        Route::put('/{id}', [CategoriaLearningController::class, 'update'])->name('categoria_learning.update');
        Route::delete('/{id}', [CategoriaLearningController::class, 'delete'])->name('categoria_learning.delete');
    });
});