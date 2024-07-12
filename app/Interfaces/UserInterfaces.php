<?php

namespace App\Interfaces;

use App\Http\Requests\User\UserRequest;
use Illuminate\Http\Request;

interface UserInterfaces
{
    public function getAllData(Request $request);
    public function register(UserRequest $request);
}
