<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthRequest;
use App\Repositories\AuthRepositories;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authRepositories;

    public function __construct(AuthRepositories $authRepositories)
    {
        $this->authRepositories = $authRepositories;
    }

    public function login(AuthRequest $request)
    {
        return $this->authRepositories->login($request);
    }

    public function logout(Request $request)
    {
        return $this->authRepositories->logout($request);
    }

    public function registerUser(AuthRequest $request)
    {
        return $this->authRepositories->registerUser($request);
    }
}
