<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserRequest;
use App\Repositories\UserRepositories;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userRepositories;

    public function __construct(UserRepositories $userRepositories)
    {
        $this->userRepositories = $userRepositories;
    }

    public function getAllData(Request $request)
    {
        return $this->userRepositories->getAllData($request);
    }
    
    public function register(UserRequest $request)
    {
        return $this->userRepositories->register($request);
    }

    public function getDataById($id)
    {
        return $this->userRepositories->getDataById($id);
    } 

    public function updateData(UserRequest $request, $id)
    {
        return $this->userRepositories->updateData($request, $id);
    } 

    public function deleteData($id)
    {
        return $this->userRepositories->deleteData($id);
    }
}
