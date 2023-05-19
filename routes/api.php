<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => ['auth:sanctum']], static function () {
    Route::get('commons', [HomeController::class, 'getCommonData']);
    Route::get('user/roles', [UserController::class, 'getActiveRoles']);
    Route::apiResource('books', BookController::class);
});

Route::get('items', [BookController::class, 'index']);
Route::get('items/{id}', [BookController::class, 'show']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
