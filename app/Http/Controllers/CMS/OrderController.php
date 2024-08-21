<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderRequest;
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
}
