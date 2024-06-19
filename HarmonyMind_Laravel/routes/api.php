<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\PublicacionEstadoController;
use App\Http\Controllers\Api\eventController;
use App\Http\Controllers\Api\LearningController;
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
Route::prefix('publicacion')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::post('create', [PublicacionEstadoController::class, 'crear_publicacion'])->name('crear.publicacion');
        Route::get('get', [PublicacionEstadoController::class, 'ver_publicaciones'])->name('ver.publicaciones');
        Route::post('modify', [PublicacionEstadoController::class, 'modificar_publicacion'])->name('modify.publicaciones');
        Route::post('delete', [PublicacionEstadoController::class, 'eliminar_publicacion'])->name('delete.publicaciones');
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

Route::prefix('learning')->group(function(){
    Route::middleware('auth:api')->group(function(){
        Route::get('learning', [LearningController::class, 'index']);
        Route::get('/learnings/create', [LearningController::class, 'create']);
        Route::post('/learnings', [LearningController::class, 'store']);
        Route::get('/learnings/{id}', [LearningController::class, 'show']);
        Route::get('/learnings/{id}/edit', [LearningController::class, 'edit']);
        Route::delete('/learnings/{id}', [LearningController::class, 'destroy']);
    });
});


Route::post('login', [LoginController::class, 'login']);
Route::post('register', [LoginController::class, 'register']);

