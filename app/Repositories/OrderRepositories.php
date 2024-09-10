<?php

namespace App\Repositories;

use App\Http\Requests\Order\OrderRequest;
use App\Http\Requests\PrepareOrder\PrepareOrderRequest;
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

    public function prepareOrder(PrepareOrderRequest $request)
    {
        try {
            $id_user = Auth::id();
            $profile = $this->profileModel->where('id_user', $id_user)->first(['id', 'name', 'personal_phone_number']);

            if (!$profile) {
                return $this->dataNotFound('success', 'Data profile not found');
            }

            $product = $this->productModel->find($request->id_product, ['price', 'stock']);
            if (!$product) {
                return $this->dataNotFound('success', 'Data product not found');
            }

            $request->request->add(['total_price' => $request->quantity * $product->price, 'status' => 'pending']);

            if ($request->quantity > $product->stock) {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Stock product is not enough'
                ]);
            }

            Config::$serverKey = config('midtrans.server_key');
            Config::$isProduction = false;
            Config::$isSanitized = true;
            Config::$is3ds = true;

            $params = array(
                'transaction_details' => array(
                    'order_id' => uniqid(),
                    'gross_amount' => $request->quantity * $product->price,
                ),
                'customer_details' => array(
                    'first_name' => $profile->name,
                    'email' => Auth::user()->email,
                    'phone' => $profile->personal_phone_number,
                ),
            );

            $snapToken = \Midtrans\Snap::getSnapToken($params);

            return $this->success([
                'snap_token' => $snapToken,
            ], 'success', 'Success prepare order');
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function createOrder(OrderRequest $request)
    {
        try {

            $product = $this->productModel->where('id', $request->id_product)->first();
            if (!$product) {
                return $this->dataNotFound('success', 'Data product not found');
            }

            $order = $this->orderModel->create([
                'id_profile' => Auth::user()->profile->id,
                'id_product' => $request->id_product,
                'quantity' => $request->quantity,
                'total_price' => $product->price * $request->quantity,
                'status' => $request->status,
            ]);

            if($order->status == 'success'){
                $product->stock = $product->stock - $order->quantity;
                $product->save();
            }
            return $this->success($product, 'success', 'Success create order');
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
            $id_product = $request->id_product;

            if (!$notification->transaction_status || !$notification->order_id) {
                return $this->error('Invalid notification data.');
            }

            $status = $notification->transaction_status;
            $order_id = $notification->order_id;

            if ($order_id) {
                $order = $this->orderModel->where('id', $order_id)->first();
                $product = $this->productModel->where('id', $id_product)->first();
                if (!$product) {
                    return $this->dataNotFound('success', 'Data product not found');
                }

                if ($order) {
                    switch ($status) {
                        case 'capture':
                        case 'settlement':
                            $order->status = 'success';
                            $product->stock = $product->stock - $order->quantity;
                            $product->save();
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
                }
            } else {
                return $this->dataNotFound();
            }

            return $this->success([
                'order' => $order,
                'product' => $product,
            ], 'success', 'Success update order status');
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function historyOrder(Request $request)
    {
        try {
            $search = $request->input('search');
            $limit = $request->input('limit') ? $request->input('limit') : 10;
            $page = $search ? 1 : (int) $request->input('page', 1);

            $id_user = Auth::user()->id;
            $id_profile = $this->profileModel->where('id_user', $id_user)->first(['id']);

            $query = $this->orderModel->query()->with('product.distributor')->where('id_profile', $id_profile->id)->where('status', '!=', 'cancel');

            if ($search) {
                $query->where('id_profile', 'like', '%' . $search . '%')
                    ->orWhere('id_product', 'like', '%' . $search . '%')
                    ->orWhereHas('product.distributor', function ($q) use ($search) {
                        $q->where('product_name', 'like', '%' . $search . '%')
                            ->orWhere('name_distributor', 'like', '%' . $search . '%');
                    })
                    ->orWhere('quantity', 'like', '%' . $search . '%')
                    ->orWhere('status', 'like', '%' . $search . '%');
            }

            $orders = $query->paginate($limit, ['*'], 'page', $page);

            if ($orders->isEmpty()) {
                return $this->dataNotFound();
            } else {
                return $this->success($orders, 'success', 'Success get history order');
            }
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function cancelOrder($id)
    {
        try {
            $id_user = Auth::user()->id;
            $data = $this->orderModel->where('id', $id)->where('status', '=', 'pending')->whereHas('profile', function($query) use ($id_user) {
                $query->where('id_user', $id_user);
            })->first();

            if (!$data) {
                return response()->json([
                    'status' => 'not found',
                    'message' => 'Order tidak ditemukan'
                ]);
            }
    
            $data->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'success cancel order'
            ]);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function getDataById($id)
    {
        try {
            $id_user = Auth::user()->id;
            $data = $this->orderModel->where('id', $id)->whereHas('profile', function($query) use ($id_user) {
                $query->where('id_user', $id_user);
            })->with('product')->first();

            if(!$data){
                return $this->dataNotFound();
            }

            return $this->success($data, 'success', 'Success get data by id');
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function updateOrder(OrderRequest $request, $id)
    {
        try {
            $order = $this->orderModel->find($id);
            if (!$order) {
                return $this->dataNotFound('success', 'Data order not found');
            }

            $order->update([
                'status' => $request->status,
            ]);

            if($order->status == 'success'){
                $product = $this->productModel->where('id', $order->id_product)->first();
                $product->stock = $product->stock - $order->quantity;
                $product->save();
            }

            return $this->success($order, 'success', 'Success update order');
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }
}
