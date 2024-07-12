<?php

use App\Http\Controllers\CMS\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('pages.usermanagement');
});

Route::prefix('v1')->group(function() {
    Route::prefix('user')->controller(UserController::class)->group(function() {
        Route::post('register', 'register');
    });
});
