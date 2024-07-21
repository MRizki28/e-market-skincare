<?php

use App\Http\Controllers\CMS\AuthController;
use App\Http\Controllers\CMS\DistributorController;
use App\Http\Controllers\CMS\ProductController;
use App\Http\Controllers\CMS\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/cms/admin/login', function () {
    return view('Auth.login');
})->name('login');

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/cms/admin', function () {
        return view('pages.usermanagement');
    });

    Route::get('/cms/admin/distributor', function() {
        return view('pages.distributor');
    });

    Route::get('/cms/admin/product', function() {
        return view('pages.product');
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::prefix('v1')->group(function () {
        Route::prefix('user')->controller(UserController::class)->group(function () {
            Route::get('/', 'getAllData');
            Route::post('register', 'register');
            Route::get('/get/{id}', 'getDataById');
            Route::post('update/{id}', 'updateData');
            Route::delete('delete/{id}', 'deleteData');
        });

        Route::prefix('distributor')->controller(DistributorController::class)->group(function () {
            Route::get('/', 'getAllData');
            Route::post('create', 'createData');
        });

        Route::prefix('product')->controller(ProductController::class)->group(function () {
            Route::get('/', 'getAllData');
            Route::post('create', 'createData');
            Route::get('/get/{id}', 'getDataById');
            Route::post('/update/{id}', 'updateData');
            Route::delete('/delete/{id}', 'deleteData');
        });
    });
    
});


Route::get('/{any}', function () {
    return view('frontend');
})->where('any', '.*');
