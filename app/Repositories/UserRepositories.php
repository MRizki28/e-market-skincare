<?php

namespace App\Repositories;

use App\Http\Requests\User\UserRequest;
use App\Interfaces\UserInterfaces;
use App\Models\ProfileModel;
use App\Models\User;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserRepositories implements UserInterfaces
{
    use HttpResponseTrait;
    protected $userModel;
    protected $profileModel;

    public function __construct(User $userModel, ProfileModel $profileModel)
    {
        $this->userModel = $userModel;
        $this->profileModel = $profileModel;
    }

    public function getAllData(Request $request)
    {
        $search = $request->input('search');
        $page = $search ? 1 : (int) $request->input('page', 1);
        $limit = $request->input('limit') ? $request->input('limit') : 10;

        $query = $this->userModel->query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', '%' . $search . '%')
                    ->orWhere('role', 'like', '%' . $search . '%');
            });
        }

        $data = $query->paginate($limit, ['*'], 'page', $page);

        if ($data->isEmpty()) {
            return $this->dataNotFound();
        } else {
            return $this->success($data, 'success', 'Success get data user');
        }
    }

    public function register(UserRequest $request)
    {
        try {
            $data = new $this->userModel;
            $data->email = $request->input('email');
            $data->password = Hash::make('12345678');
            $data->save();
            return $this->success($data, 'success', 'Success register');
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function getDataById($id)
    {
        $data = $this->userModel->find($id);
        if ($data) {
            return $this->success($data, 'success', 'Success get data by id');
        } else {
            return $this->dataNotFound();
        }
    }

    public function updateData(UserRequest $request, $id)
    {
        try {
            $data = $this->userModel->find($id);
            if ($data) {
                $data->email = $request->input('email');
                $data->password = Hash::make('12345678');
                $data->save();
                return $this->success($data, 'success', 'Success update data');
            } else {
                return $this->dataNotFound();
            }
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function deleteData($id)
    {
        $data = $this->userModel->find($id);
        if ($data->id == Auth::user()->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You can\'t delete your own account'
            ], 400);
        } else {
            if ($data) {
                $data->delete();
                return $this->delete();
            } else {
                return $this->dataNotFound();
            }
        }
    }

    public function getDataPersonalUser()
    {
        $data = $this->userModel->with('profile')->where('id', Auth::user()->id)->first();
        if ($data) {
            return $this->success($data, 'success', 'Success get data personal user');
        } else {
            return $this->dataNotFound();
        }
    }
}
