<?php

namespace App\Interfaces;

use App\Http\Requests\Distributor\DistributorRequest;
use Illuminate\Http\Request;

interface DistributorInterfaces
{
    public function getAllData(Request $request);
    public function createData(DistributorRequest $request);
}
