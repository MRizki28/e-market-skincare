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

    public function createData(DistributorRequest $request)
    {
        return $this->distributorRepositories->createData($request);
    }
}
