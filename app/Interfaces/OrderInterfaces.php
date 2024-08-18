<?php

namespace App\Interfaces;

use App\Http\Requests\Order\OrderRequest;
use Illuminate\Http\Request;

interface OrderInterfaces
{
    public function getAllData(Request $request);
    public function createOrder (OrderRequest $request);
}
