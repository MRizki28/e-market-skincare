<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_order';
    protected $fillable = [
        'id',
        'id_profile',
        'id_product',
        'quantity',
        'total_price'
    ];

    public function profile()
    {
        return $this->belongsTo(ProfileModel::class, 'id_profile', 'id');
    }

    public function product()
    {
        return $this->belongsTo(ProductModel::class, 'id_product', 'id');
    }
}
