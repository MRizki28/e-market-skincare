<?php

namespace App\Repositories;

use App\Http\Requests\Distributor\DistributorRequest;
use App\Interfaces\DistributorInterfaces;
use App\Models\DistributorModel;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DistributorRepositories implements DistributorInterfaces
{

    protected $distributorModel;
    use HttpResponseTrait;

    public function __construct(DistributorModel $distributorModel)
    {
        $this->distributorModel = $distributorModel;
    }

    public function getAllData()
    {
        try {
            $id_user = Auth::user()->id;
            $data = $this->distributorModel->where('id_user', $id_user)->get();
            if ($data->isEmpty()) {
                return $this->success([], 'data not found', 'Data distributor not found');
            }else{
                return $this->success($data, 'success', 'Success get all data distributor');
            }
        } catch (\Throwable $th) {
            return $this->error($th);
        }
    }

    public function createData(DistributorRequest $request)
    {
        try {
            $id_user = Auth::user()->id;
            $data = $this->distributorModel->updateOrCreate(
                ['id_user' => $id_user],
                [
                    'id_user' => $id_user,
                    'name_distributor' => $request->input('name_distributor'),
                    'address' => $request->input('address'),
                    'phone_number' => $request->input('phone_number'),
                ]
            );

            return $this->success($data, 'success', 'Success create or update data distributor');
        } catch (\Throwable $th) {
            return $this->error($th);
        }
    }
}
