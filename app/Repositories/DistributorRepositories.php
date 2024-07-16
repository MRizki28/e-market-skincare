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

    public function getAllData(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $page = (int) $request->input('page', 1);

        $query = $this->distributorModel->query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name_distributor', 'like', '%' . $search . '%')
                    ->orWhere('address', 'like', '%' . $search . '%')
                    ->orWhere('phone_number', 'like', '%' . $search . '%');
            });
        }

        $data = $query->paginate($limit, ['*'], 'page', $page);

        if ($data->isEmpty()) {
            return $this->dataNotFound();
        } else {
            return $this->success($data, 'success', 'Success get data distributor');
        }
    
    }

    public function createData(DistributorRequest $request)
    {
        try {
            $id_user = Auth::user()->id;
            $data = new $this->distributorModel;
            $data->id_user = $id_user;
            $data->name_distributor = $request->input('name_distributor');
            $data->address = $request->input('address');
            $data->phone_number = $request->input('phone_number');
            $data->save();

            return $this->success($data, 'success', 'Success create data distributor');
        } catch (\Throwable $th) {
            return $this->error($th);
        }
    }
}
