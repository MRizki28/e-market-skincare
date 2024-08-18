<?php

namespace App\Repositories;

use App\Http\Requests\Order\OrderRequest;
use App\Interfaces\OrderInterfaces;
use App\Models\OrderModel;
use App\Models\ProductModel;
use App\Models\ProfileModel;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderRepositories implements OrderInterfaces
{
    protected $orderModel;
    protected $profileModel;
    protected $productModel;
    use HttpResponseTrait;

    public function __construct(OrderModel $orderModel, ProfileModel $profileModel, ProductModel $productModel)
    {
        $this->orderModel = $orderModel;
        $this->profileModel = $profileModel;
        $this->productModel = $productModel;
    }

    public function getAllData(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $page = $search ? 1 : (int) $request->input('page', 1);

        $query = $this->orderModel->query()->with(['profile', 'product']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('id_profile', 'like', '%' . $search . '%')
                    ->orWhereHas('profile', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%');
                    })
                    ->orWhere('id_product', 'like', '%' . $search . '%')
                    ->orWhereHas('product', function ($q) use ($search) {
                        $q->where('product_name', 'like', '%' . $search . '%');
                    })
                    ->orWhere('quantity', 'like', '%' . $search . '%');
            });
        }

        $data = $query->paginate($limit, ['*'], 'page', $page);

        if ($data->isEmpty()) {
            return $this->dataNotFound();
        } else {
            return $this->success($data, 'success', 'Success get data order');
        }
    }

    public function createOrder(OrderRequest $request) {
        try {
            $id_user = Auth::id();
            $profile = $this->profileModel->where('id_user', $id_user)->first(['id']);
    
            if (!$profile) {
                return $this->dataNotFound('success', 'Data profile not found');
            }
    
            $product = $this->productModel->find($request->id_product, ['price']);
            if (!$product) {
                return $this->dataNotFound('success','Data product not found');
            }

            $order = $this->orderModel->create([
                'id_profile' => $profile->id,
                'id_product' => $request->id_product,
                'quantity' => $request->quantity,
                'total_price' => $request->quantity * $product->price,
            ]);
    
            return $this->success($order, 'Success create data order');
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }
    
}
