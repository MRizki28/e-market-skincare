<?php

namespace App\Repositories;

use App\Http\Requests\Product\ProductRequest;
use App\Interfaces\ProductInterfaces;
use App\Models\ProductModel;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductRepositories implements ProductInterfaces
{
    protected $productModel;
    use HttpResponseTrait;

    public function __construct(ProductModel $productModel)
    {
        $this->productModel = $productModel;
    }

    public function getAllData(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit') ? $request->input('limit') : 11;
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
            $data = new $this->productModel;
            $data->product_name = $request->input('product_name');
            if ($request->hasFile('product_image')) {
                $file = $request->file('product_image');
                $extension = $file->getClientOriginalExtension();
                $filename = 'PRODUCT-' . Str::random(5) . '.' . $extension;
                $file->move(public_path('uploads/product'), $filename);
                $data->product_image = $filename;
            }
            $data->price = $request->input('price');
            $data->save();
            return $this->success($data, 'success', 'Success create data product');
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
            }else{
                $data->product_name = $request->input('product_name');
                if ($request->hasFile('product_image')) {
                    $file = $request->file('product_image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = 'PRODUCT-' . Str::random(5) . '.' . $extension;
                    $file->move(public_path('uploads/product'), $filename);
                    $old_file = public_path('uploads/product/'). $data->product_image;
                    if (file_exists($old_file)) {
                        unlink($old_file);
                    }
                    $data->product_image = $filename;
                }
                $data->price = $request->input('price');
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
            }else{
                $old_file = public_path('uploads/product/'). $data->product_image;
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
}
