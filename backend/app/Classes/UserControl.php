<?php

namespace App\Classes;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Human;

class UserControl
{
    static function editUserWithHuman(Request $request, $login)
    {
        $name = $request['name'];
        $lastname = $request['lastname'];
        $patronymic = $request['patronymic'];
        $speciality = $request['speciality'];

        $user = User::select('speciality', 'human_id')->where('login', $login)->first();
        $human = Human::select('surname', 'first_name', 'patronymic')->where('id', $user->human_id)->first();

        $user->speciality = $speciality;
        $human->surname = $lastname;
        $human->first_name = $name;
        $human->patronymic = $patronymic;

        $user->save();
        $human->save();

        if ( true ) {
            return ['status', '0'];
        } else {
            return ['status', '-1'];
        }
    }
}
