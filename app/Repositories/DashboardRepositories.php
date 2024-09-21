<?php

namespace App\Repositories;

use App\Interfaces\DashboardInterface;
use App\Models\DistributorModel;
use App\Models\OrderModel;
use App\Models\ProductModel;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashboardRepositories implements DashboardInterface
{
    protected $productModel;
    protected $userModel;
    protected $orderModel;
    protected $distributorModel;

    public function __construct(ProductModel $productModel, User $userModel, OrderModel $orderModel, DistributorModel $distributorModel)
    {
        $this->productModel = $productModel;
        $this->userModel = $userModel;
        $this->orderModel = $orderModel;
        $this->distributorModel = $distributorModel;
    }

    public function dashboard()
    {

        $countAllProduct = $this->productModel->count();
        $countUser = $this->userModel->count();

        if (Auth::user()->role == 'distributor') {
            $id_user = Auth::user()->id;

            $id_distributor = $this->distributorModel->where('id_user', $id_user)->pluck('id')->first();

            $countProductByDistributor = $this->productModel->whereHas('distributor', function ($query) use ($id_user) {
                $query->where('id_user', $id_user);
            })->count();

            $countOrderSuccessPayment = $this->orderModel->where('status', 'success')->whereHas('product', function ($query) use ($id_distributor) {
                $query->where('id_distributor', $id_distributor);
            })->count();

            $countOrderNotSuccessPayment = $this->orderModel->where('status', '!=', 'success')->whereHas('product', function ($query) use ($id_distributor) {
                $query->where('id_distributor', $id_distributor);
            })->count();

            $countTotalMonay = $this->orderModel->where('status', 'success')->whereHas('product', function ($query) use ($id_distributor) {
                $query->where('id_distributor', $id_distributor);
            })->sum('total_price');
        }


        return response()->json([
            'status' => 'success',
            'data' => [
                'product' => $countAllProduct ?? 0,
                'user' => $countUser ?? 0,
                'product_by_distributor' => $countProductByDistributor ?? 0,
                'order_success_payment' => $countOrderSuccessPayment ?? 0,
                'order_not_success_payment' => $countOrderNotSuccessPayment ?? 0,
                'total_money' => $countTotalMonay ?? 0
            ]
        ], 200);
    }
}
