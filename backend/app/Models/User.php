<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    protected $primaryKey = 'login';
    public $incrementing = 'false';
    protected $table = 'user';
    public $timestamps = false;
}
