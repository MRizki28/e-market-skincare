<?php

use App\Http\Controllers\CMS\AuthController;
use App\Http\Controllers\CMS\DistributorController;
use App\Http\Controllers\CMS\OrderController;
use App\Http\Controllers\CMS\ProductController;
use App\Http\Controllers\CMS\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/login' , function() {
    return view('frontend');
})->name('login');

Route::post('/login', [AuthController::class, 'login']);
Route::get('best-product', [ProductController::class, 'bestProduct']);
Route::post('api/v1/register-user', [AuthController::class, 'registerUser']);
Route::get('api/v1/distributor', [DistributorController::class, 'getDataForFe']);
Route::get('api/v1/product-by-distributor/{id}', [ProductController::class, 'getDataByDistributor']);
Route::get('api/v1/distributor/{id}', [DistributorController::class, 'getDataById']);


Route::get('check', [UserController::class, 'getAllUser']);
Route::middleware(['web', 'auth'])->group(function () {
    Route::get('api/check-auth', function () {
        return response()->json(['data' => true]);
    });

    Route::get('product-detail/{id}', [ProductController::class, 'getDataById']);
    Route::get('/cms/admin/usermanagement', function () {
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
            Route::get('/get-isready', 'getAvailableProduct');
        });

        Route::prefix('order')->controller(OrderController::class)->group(function () {
            Route::get('/', 'getAllData');
            Route::post('prepare-order', 'prepareOrder');
            Route::post('create-order', 'createOrder');
            Route::post('update/', 'orderNotification');
            Route::get('history', 'historyOrder');
            Route::delete('cancel-order/{id}', 'cancelOrder');
            Route::get('/get/{id}', 'getDataById');
            Route::post('/update-order/{id}', 'updateOrder');
        });
    });
    
});


Route::fallback(function () {
    return view('frontend');
});

