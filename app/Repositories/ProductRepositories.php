<?php

namespace App\Repositories;

use App\Helper\FileUpload;
use App\Http\Requests\Product\ProductRequest;
use App\Interfaces\ProductInterfaces;
use App\Models\DistributorModel;
use App\Models\ProductModel;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductRepositories implements ProductInterfaces
{
    protected $productModel;
    protected $distributorModel;
    protected $fileUpload;
    use HttpResponseTrait;

    public function __construct(ProductModel $productModel, DistributorModel $distributorModel, FileUpload $fileUpload)
    {
        $this->productModel = $productModel;
        $this->distributorModel = $distributorModel;
        $this->fileUpload = $fileUpload;
    }

    public function getAllData(Request $request)
    {
        $id_user = Auth::user();

        $id_distributor = $this->distributorModel->where('id_user', $id_user->id)->pluck('id')->first();

        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $page = $search ? 1 : (int) $request->input('page', 1);

        $query = $this->productModel->query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('product_name', 'like', '%' . $search . '%')
                    ->orWhere('price', 'like', '%' . $search . '%');
            });
        }

        $data = $query->where('id_distributor', $id_distributor)->paginate($limit, ['*'], 'page', $page);

        if ($data->isEmpty()) {
            return $this->dataNotFound();
        } else {
            return $this->success($data, 'success', 'Success get data product');
        }
    }

    public function createData(ProductRequest $request)
    {
        try {
            $user_id = Auth::user()->id;
            $distributor = $this->distributorModel->where('id_user', $user_id)->first();
            if (!$distributor) {
                return $this->dataNotFound('data not found', 'Data distributor not found');
            } else {
                $data = new $this->productModel;
                $data->product_name = $request->input('product_name');
                $data->product_code = '#' . Str::random(5);
                $data->id_distributor = $distributor->id;
                if ($request->hasFile('product_image')) {
                    $data->product_image = $this->fileUpload->uploadFile($request->file('product_image'), 'uploads/product/', 'PRODUCT-');
                }
                $data->price = $request->input('price');
                $data->description = $request->input('description');
                $data->stock = $request->input('stock');
                $data->save();
                return $this->success($data, 'success', 'Success create data product');
            }
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function getDataById($id)
    {
        $data = $this->productModel->with('distributor.product')->find($id);
        if ($data) {
            $totalProducts = $data->distributor ? $data->distributor->product->count() : 0;
            $data['total_products'] = $totalProducts;
            return $this->success($data, 'success', 'Success get data by id');
        } else {
            return $this->dataNotFound();
        }
    }

    public function updateData(ProductRequest $request, $id)
    {
        try {
            $data = $this->productModel->find($id);
            if (!$data) {
                return $this->dataNotFound();
            } else {
                $data->product_name = $request->input('product_name');
                if ($request->hasFile('product_image')) {
                    $data->product_image = $this->fileUpload->updateFile($request->file('product_image'), 'uploads/product/', 'PRODUCT-', $data->product_image);
                }
                $data->price = $request->input('price');
                $data->description = $request->input('description');
                $data->stock = $request->input('stock');
                $data->save();
                return $this->success($data, 'success', 'Success update data product');
            }
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function deleteData($id)
    {
        try {
            $data = $this->productModel->find($id);
            if (!$data) {
                return $this->dataNotFound();
            } else {
                $old_file = public_path('uploads/product/') . $data->product_image;
                $data->delete();
                
                if (file_exists($old_file)) {
                    unlink($old_file);
                }
                return $this->delete();
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'server sedang maintenance'
            ]);
        }
    }

    public function bestProduct(Request $request)
    {
        try {
            $data = $this->productModel->where('stock', '>', 0)->orderBy('created_at', 'desc')->take(5)->get();
            if ($data->isEmpty()) {
                return $this->dataNotFound();
            } else {
                return $this->success($data, 'success', 'Success get best product');
            }
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function getDataByDistributor(Request $request, $id)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $page = $search ? 1 : (int) $request->input('page', 1);

        $query = $this->productModel->where('id_distributor', $id);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('product_name', 'like', '%' . $search . '%')
                    ->orWhere('price', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        $data = $query->where('stock', '>', 0)->paginate($limit, ['*'], 'page', $page);

        if ($data->isEmpty()) {
            return $this->dataNotFound();
        } else {
            return $this->success($data, 'success', 'Success get data product by distributor');
        }
    }

    public function getAvailableProduct(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 1;
        $page = $search ? 1 : (int) $request->input('page', 1);

        $query = $this->productModel->query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('product_name', 'like', '%' . $search . '%')
                    ->orWhere('price', 'like', '%' . $search . '%');
            });
        }

        $data = $query->where('stock', '>', 0)->paginate($limit, ['*'], 'page', $page);

        if ($data->isEmpty()) {
            return $this->dataNotFound();
        } else {
            return $this->success($data, 'success', 'Success get data product');
        }
    }

    public function getProductForAdmin(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $page = $search ? 1 : (int) $request->input('page', 1);

        $query = $this->productModel->query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('product_name', 'like', '%' . $search . '%')
                    ->orwhereHas('distributor', function ($q) use ($search) {
                        $q->where('name_distributor', 'like', '%' . $search . '%');
                    })
                    ->orWhere('price', 'like', '%' . $search . '%');
            });
        }

        $data = $query->with('distributor')->paginate($limit, ['*'], 'page', $page);

        if ($data->isEmpty()) {
            return $this->dataNotFound();
        } else {
            return $this->success($data, 'success', 'Success get data product');
        }
    }
}
