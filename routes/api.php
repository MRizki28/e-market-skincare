<?php

use App\Http\Controllers\CMS\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Route::get('check-auth', function () {
//     return response()->json(['data' => true]);
// })->middleware('auth:sanctum');

Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
