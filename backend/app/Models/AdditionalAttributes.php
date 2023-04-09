<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdditionalAttributes extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $table = 'additional_attributes';
    public $timestamps = false;
}
