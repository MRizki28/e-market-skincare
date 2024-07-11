<?php

namespace App\Interfaces;

use App\Http\Requests\User\UserRequest;

interface UserInterfaces
{
    public function register(UserRequest $request);
}
