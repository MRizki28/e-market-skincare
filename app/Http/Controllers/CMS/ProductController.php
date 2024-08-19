<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductRequest;
use App\Repositories\ProductRepositories;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productRepositories;

    public function __construct(ProductRepositories $productRepositories)
    {
        $this->productRepositories = $productRepositories;
    }

    public function getAllData(Request $request)
    {
        return $this->productRepositories->getAllData($request);
    }

    public function createData(ProductRequest $request)
    {
        return $this->productRepositories->createData($request);
    }

    public function getDataById($id)
    {
        return $this->productRepositories->getDataById($id);
    }

    public function updateData(ProductRequest $request, $id)
    {
        return $this->productRepositories->updateData($request, $id);
    }

    public function deleteData($id)
    {
        return $this->productRepositories->deleteData($id);
    }

    public function bestProduct(Request $request)
    {
        return $this->productRepositories->bestProduct($request);
    }

    public function getDataByDistributor(Request $request, $id)
    {
        return $this->productRepositories->getDataByDistributor($request, $id);
    }

    public function getAvailableProduct(Request $request)
    {
        return $this->productRepositories->getAvailableProduct($request);
    }
}
