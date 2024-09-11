<?php

namespace App\Repositories;

use App\Http\Requests\Auth\AuthRequest;
use App\Interfaces\AuthInterfaces;
use App\Models\ProfileModel;
use App\Models\User;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthRepositories implements AuthInterfaces
{
    protected $userModel;
    protected $profileModel;
    use HttpResponseTrait;

    public function __construct(User $userModel, ProfileModel $profileModel)
    {
        $this->userModel = $userModel;
        $this->profileModel = $profileModel;
    }

    public function login(AuthRequest $request)
    {
        try {
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'status' => 'Unauthorized',
                    'message' => 'email or password is incorrect',
                ], 401);
            } else {
                $user = $this->userModel->with('profile')->where('email', $request->email)->first();
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'status' => 'success',
                    'message' => 'login success',
                    'data' => [
                        'name' => $user->profile->name ?? null,
                        'address' => $user->profile->personal_address ?? null,
                        'phone_number' => $user->profile->personal_phone_number ?? null,
                        'email' => $user->email,
                        'token' => $token,
                        'role' => $user->role,
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

    public function registerUser(AuthRequest $request)
    {
        try {
            DB::beginTransaction();
            $user = new $this->userModel;
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->role = $request->input('role');
            $user->save();

            DB::commit();
            $profile = new $this->profileModel;
            $profile->id_user = $user->id;
            $profile->name = $request->input('name');
            $profile->personal_address = $request->input('personal_address');
            $profile->personal_phone_number = $request->input('personal_phone_number');
            $profile->save();

            return $this->success([
                'user' => $user,
                'profile' => $profile,
            ], 'success', 'register success');

            DB::commit();

            return $this->success([
                'user' => $user,
            ], 'success', 'register success');
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->error($th->getMessage());
        }
    }
}
