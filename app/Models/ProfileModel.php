<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tb_profile';
    protected $fillable = [
        'id',
        'id_user',
        'name',
        'personal_address',
        'personal_phone_number'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
