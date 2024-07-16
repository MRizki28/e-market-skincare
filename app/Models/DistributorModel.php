<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DistributorModel extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'tb_distributor';
    protected $fillable = [
        'id',
        'id_user',
        'name_distributor',
        'address',
        'phone_number'
    ];
}
