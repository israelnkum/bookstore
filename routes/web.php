<?php

use App\Http\Controllers\SocialAuthController;
use Illuminate\Support\Facades\Route;

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

Route::prefix('auth/google')->group(static function () {
    Route::get('redirect', [SocialAuthController::class, 'redirectToGoogle']);
    Route::get('callback', [SocialAuthController::class, 'handleGoogleCallback']);
});

Route::get('/landing/{path?}', static function () {
    return view('app-store');
})->where('path','.*');

Route::middleware(['auth'])->get('/{path?}', function () {
    return view('home');
})->where('path', '.*')->name('home');
