<?php

namespace App\Http\Controllers;

use App\Classes\UserControl;
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
    public function editProfile(Request $request, $login)
    {
        return UserControl::editUserWithHuman($request, $login);
    }
    public function deleteProfile($login)
    {
        return UserControl::deleteUserWithHuman($login);
    }
    public function createProfile(Request $request)
    {
        return UserControl::createUserWithHuman($request);
    }
}
