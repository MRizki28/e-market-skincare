<?php

namespace App\Interfaces;

use App\Http\Requests\Order\OrderRequest;
use App\Http\Requests\PrepareOrder\PrepareOrderRequest;
use Illuminate\Http\Request;

interface OrderInterfaces
{
    public function getAllData(Request $request);
    public function prepareOrder (PrepareOrderRequest $request);
    public function createOrder(OrderRequest $request);
    public function orderNotification(Request $request);
    public function historyOrder(Request $request);
}
