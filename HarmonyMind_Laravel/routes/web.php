<?php

use Illuminate\Support\Facades\Route;
use App\http\Controllers\usersController;
use App\http\Controllers\categoryController;
use App\http\Controllers\eventController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/users', [usersController::class, 'index'])->name('users')/*->middleware('auth')*/;
Route::get('/users/{id}', [usersController::class, 'show'])->name('users-edit')->middleware('auth');
Route::patch('/users/{id}', [usersController::class, 'update'])->name('users-update')->middleware('auth');
Route::delete('/users/{id}', [usersController::class, 'destroy'])->name('users-destroy')/*->middleware('auth')*/;
Route::get('/users/events/{id}', [usersController::class, 'assign_event'])->name('users-assign-event')/*->middleware('auth')*/;
Route::post('/users', [usersController::class, 'relation_store'])->name('relations-store');
Route::get('/users/events/remove/{id}', [usersController::class, 'remove_event'])->name('users-remove-event')/*->middleware('auth')*/;
Route::delete('/users/events/{id}', [usersController::class, 'relation_remove'])->name('relations-remove')/*->middleware('auth')*/;

Route::get('/categories', [categoryController::class, 'index'])->name('categories')/*->middleware('auth')*/;
Route::get('/categories/create', [categoryController::class, 'create'])->name('categories-create');
Route::post('/categories', [categoryController::class, 'store'])->name('categories-store');
Route::get('/categories/{id}', [categoryController::class, 'show'])->name('categories-edit');
Route::patch('/categories/{id}', [categoryController::class, 'update'])->name('categories-update');
Route::delete('/categories/{id}', [categoryController::class, 'destroy'])->name('categories-destroy')/*->middleware('auth')*/;

Route::get('/events', [eventController::class, 'index'])->name('events')/*->middleware('auth')*/;
Route::get('/events/create', [App\Http\Controllers\eventController::class, 'create'])->name('events-create');
Route::post('/events', [eventController::class, 'store'])->name('events-store');
Route::get('/events/{id}', [eventController::class, 'show'])->name('events-edit');
Route::patch('/events/{id}', [eventController::class, 'update'])->name('events-update');
Route::delete('/events/{id}', [eventController::class, 'destroy'])->name('events-destroy')/*->middleware('auth')*/;