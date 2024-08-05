<?php

namespace App\Interfaces;

use App\Http\Requests\Product\ProductRequest;
use Illuminate\Http\Request;

interface ProductInterfaces
{
    public function getAllData(Request $request);
    public function createData(ProductRequest $request);
    public function getDataById($id);
    public function updateData(ProductRequest $request, $id);
    public function deleteData($id);
    public function bestProduct(Request $request);
    public function getDataByDistributor(Request $request, $id);
}
