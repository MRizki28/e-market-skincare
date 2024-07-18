<?php

namespace App\Interfaces;

use App\Http\Requests\Distributor\DistributorRequest;
use Illuminate\Http\Request;

interface DistributorInterfaces
{
    public function getAllData();
    public function createData(DistributorRequest $request);
}
