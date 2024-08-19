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
use Midtrans\Config;
use Midtrans\Notification;

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

    public function createOrder(OrderRequest $request)
    {
        try {
            $id_user = Auth::id();
            $profile = $this->profileModel->where('id_user', $id_user)->first(['id', 'name', 'personal_phone_number']);

            if (!$profile) {
                return $this->dataNotFound('success', 'Data profile not found');
            }

            $product = $this->productModel->find($request->id_product, ['price']);
            if (!$product) {
                return $this->dataNotFound('success', 'Data product not found');
            }

            $request->request->add(['total_price' => $request->quantity * $product->price, 'status' => 'pending']);

            $order = $this->orderModel->create([
                'id_profile' => $profile->id,
                'id_product' => $request->id_product,
                'quantity' => $request->quantity,
                'total_price' => $request->quantity * $product->price,
            ]);

            Config::$serverKey = config('midtrans.server_key');
            Config::$isProduction = false;
            Config::$isSanitized = true;
            Config::$is3ds = true;

            $params = array(
                'transaction_details' => array(
                    'order_id' => $order->id,
                    'gross_amount' => $order->total_price,
                ),
                'customer_details' => array(
                    'first_name' => $profile->name,
                    'email' => Auth::user()->email,
                    'phone' => $profile->personal_phone_number,
                ),
            );

            $snapToken = \Midtrans\Snap::getSnapToken($params);

            return $this->success([
                'order' => $order,
                'snap_token' => $snapToken,
            ], 'success', 'Success create order');


        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function orderNotification(Request $request)
    {
        try {
            Config::$serverKey = config('midtrans.server_key');
            Config::$isProduction = false;
            Config::$isSanitized = true;
            Config::$is3ds = true;
    
            $notification = new Notification();
            
            if (!$notification->transaction_status || !$notification->order_id) {
                return $this->error('Invalid notification data.');
            }
    
            $status = $notification->transaction_status;
            $order_id = $notification->order_id;
    
            if ($order_id) {
                $order = $this->orderModel->where('id', $order_id)->first();
    
                if ($order) {
                    switch ($status) {
                        case 'capture':
                        case 'settlement':
                            $order->status = 'success';
                            break;
    
                        case 'pending':
                            $order->status = 'pending';
                            break;
    
                        case 'deny':
                        case 'expire':
                        case 'cancel':
                            $order->status = 'cancel';
                            break;
    
                        default:
                            $order->status = 'pending';
                            break;
                    }
    
                    $order->save();
                } else {
                    return $this->success($order, 'success', 'Success update order status');
                }
            } else {
                return $this->dataNotFound();
            }
    
            return response()->json(['status' => 'success'], 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }
}
