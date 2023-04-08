<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Classes\UserInfo;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        return UserInfo::login($request);
    }
    public function getProfile($login)
    {
        return UserInfo::getProfile($login);
    }
}
