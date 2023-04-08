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

        if ($login && $password) {
            $user = User::where('login', $login)->first();
            if ($user) {
                if ($user->password == $password) {
                    return response(['is_loginned' => true]);
                } else {
                    return response(['is_loginned' => false]);
                }
            } else {
                return response("User do not exist");
            }
        }
    }
}
