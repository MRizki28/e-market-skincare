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
    public function cancelOrder($id);
    public function getDataById($id);
    public function updateOrder(OrderRequest $request, $id);
    public function getDataByDistributor(Request $request);
    public function deleteData($id);
}
