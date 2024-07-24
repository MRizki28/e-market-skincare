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
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $page = (int) $request->input('page', 1);

        $query = $this->productModel->query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('product_name', 'like', '%' . $search . '%')
                    ->orWhere('price', 'like', '%' . $search . '%');
            });
        }

        $data = $query->paginate($limit, ['*'], 'page', $page);

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
                $data->id_distributor = $distributor->id;
                if ($request->hasFile('product_image')) {
                    $data->product_image = $this->fileUpload->uploadFile($request->file('product_image'), 'uploads/product/', 'PRODUCT-');
                }
                $data->price = $request->input('price');
                $data->description = $request->input('description');
                $data->save();
                return $this->success($data, 'success', 'Success create data product');
            }
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function getDataById($id)
    {
        $data = $this->productModel->find($id);
        if ($data) {
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
                if (file_exists($old_file)) {
                    unlink($old_file);
                }
                $data->delete();
                return $this->delete();
            }
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    public function bestProduct(Request $request)
    {
        try {
            $data = $this->productModel->orderBy('created_at', 'desc')->limit(5)->get();
            if ($data->isEmpty()) {
                return $this->dataNotFound();
            } else {
                return $this->success($data, 'success', 'Success get best product');
            }
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }
}
