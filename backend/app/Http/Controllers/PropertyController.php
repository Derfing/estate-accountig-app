<?php

namespace App\Http\Controllers;

use App\Classes\PropertyControl;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function createProperty(Request $request)
    {
        return PropertyControl::create($request);
    }
}
