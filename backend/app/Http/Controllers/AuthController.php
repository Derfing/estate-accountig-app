<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use function PHPUnit\Framework\returnValueMap;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $login = $request['login'];
        $password = $request['password'];

        if ($login && $password)
        {
            $user = User::where('login', $login)->first();
            $time = 24 * 60;
            $response = new \Illuminate\Http\Response();
            if ($user->password == $password)
            {
                return $response->cookie('is_logined', 'true', $time);
            }
            else
            {
                return $response->cookie('is_logined', 'false', $time);
            }
        }
    }
}
