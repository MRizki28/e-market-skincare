<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderRequest;
use App\Http\Requests\PrepareOrder\PrepareOrderRequest;
use App\Repositories\OrderRepositories;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderRepositories;

    public function __construct(OrderRepositories $orderRepositories)
    {
        $this->orderRepositories = $orderRepositories;
    }
    
    public function getAllData(Request $request)
    {
        return $this->orderRepositories->getAllData($request);
    }

    public function prepareOrder(PrepareOrderRequest $request)
    {
        return $this->orderRepositories->prepareOrder($request);
    }

    public function createOrder(OrderRequest $request)
    {
        return $this->orderRepositories->createOrder($request);
    }

    public function orderNotification(Request $request)
    {
        return $this->orderRepositories->orderNotification($request);
    }

    public function historyOrder(Request $request)
    {
        return $this->orderRepositories->historyOrder($request);
    }   

    public function cancelOrder($id)
    {
        return $this->orderRepositories->cancelOrder($id);
    }

    public function getDataById($id)
    {
        return $this->orderRepositories->getDataById($id);
    }

    public function updateOrder(OrderRequest $request, $id)
    {
        return $this->orderRepositories->updateOrder($request, $id);
    }

    public function getDataByDistributor(Request $request)
    {
        return $this->orderRepositories->getDataByDistributor($request);
    }

    public function deleteData($id)
    {
        return $this->orderRepositories->deleteData($id);
    }
}
