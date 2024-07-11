<?php

namespace App\Repositories;

use App\Http\Requests\User\UserRequest;
use App\Interfaces\UserInterfaces;
use App\Models\User;
use App\Traits\HttpResponseTrait;
use Illuminate\Support\Facades\Hash;

class UserRepositories implements UserInterfaces
{
    use HttpResponseTrait;
    protected $userModel;

    public function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    public function register(UserRequest $request)
    {
        try {
            $data = new $this->userModel;
            $data->email = $request->input('email');
            $data->password = Hash::make($request->input('password'));
            $data->save();
            return $this->success($data, 'success', 'Success register');
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }
}
