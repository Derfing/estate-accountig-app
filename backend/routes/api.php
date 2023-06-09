<?php

use App\Http\Controllers\PropertyController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);

Route::post('/profile/create', [AuthController::class, 'createProfile']);

Route::delete('/profile/{login}/delete', [AuthController::class, 'deleteProfile']);

Route::put('/profile/{login}/edit', [AuthController::class, 'editProfile']);

Route::get('/profile/{login}', [AuthController::class, 'getProfile']);

Route::post('/property/create', [PropertyController::class, 'createProperty']);
