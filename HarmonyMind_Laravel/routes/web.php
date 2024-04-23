<?php

use Illuminate\Support\Facades\Route;
use App\http\Controllers\usersController;
use App\http\Controllers\categoryController;

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

Route::get('/categories', [categoryController::class, 'index'])->name('categories')/*->middleware('auth')*/;
Route::get('/categories/create', [App\Http\Controllers\categoryController::class, 'create'])->name('categories-create');
Route::post('/categories', [categoryController::class, 'store'])->name('categories-store');
Route::get('/categories/{id}', [categoryController::class, 'show'])->name('categories-edit');
Route::patch('/categories/{id}', [categoryController::class, 'update'])->name('categories-update');
Route::delete('/categories/{id}', [categoryController::class, 'destroy'])->name('categories-destroy')/*->middleware('auth')*/;
