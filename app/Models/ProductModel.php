<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_product';
    protected $fillable = [
        'id',
        'id_distributor',
        'product_code',
        'product_name',
        'product_image',
        'price',
        'description',
        'stock',
    ];

    public function distributor()
    {
        return $this->belongsTo(DistributorModel::class, 'id_distributor', 'id');
    }
}
