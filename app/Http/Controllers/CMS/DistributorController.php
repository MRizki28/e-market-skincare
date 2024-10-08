<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Distributor\DistributorRequest;
use App\Repositories\DistributorRepositories;
use Illuminate\Http\Request;

class DistributorController extends Controller
{
    protected $distributorRepositories;

    public function __construct(DistributorRepositories $distributorRepositories)
    {
        $this->distributorRepositories = $distributorRepositories;
    }

    public function getAllData()
    {
        return $this->distributorRepositories->getAllData();
    }

    public function createData(DistributorRequest $request)
    {
        return $this->distributorRepositories->createData($request);
    }

    public function getDataForFe(Request $request)
    {
        return $this->distributorRepositories->getDataForFe($request);
    }

    public function getDataById($id)
    {
        return $this->distributorRepositories->getDataById($id);
    }
}
