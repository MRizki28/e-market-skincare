<?php

namespace App\Repositories;

use App\Http\Requests\Auth\AuthRequest;
use App\Interfaces\AuthInterfaces;
use App\Models\User;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthRepositories implements AuthInterfaces
{
    protected $userModel;
    use HttpResponseTrait;

    public function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    public function login(AuthRequest $request)
    {
        try {
            if(!Auth::attempt($request->only('email', 'password'))){
                return response()->json([
                    'status' => 'Unauthorized',
                    'message' => 'email or password is incorrect',
                ], 401);
            }else{
                $user = $this->userModel->with('profile')->where('email', $request->email)->first();
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'status' => 'success',
                    'message' => 'login success',
                    'data' => [
                        'name' => $user->profile->name,
                        'address' => $user->profile->personal_address,
                        'phone_number' => $user->profile->personal_phone_number,
                        'email' => $user->email,
                        'token' => $token,
                    ]
                ], 200);
            }
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return response()->json([
                'status' => 'success',
                'message' => 'logout success',
            ], 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }
}