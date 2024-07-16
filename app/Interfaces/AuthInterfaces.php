<?php


namespace App\Interfaces;

use App\Http\Requests\Auth\AuthRequest;

interface AuthInterfaces
{
    public function login(AuthRequest $request);
}