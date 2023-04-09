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

        $user = User::find($login);
        $human = Human::find($user->human_id);

        $user->speciality = $speciality;
        $human->surname = $lastname;
        $human->first_name = $name;
        $human->patronymic = $patronymic;

        $user->save();
        $human->save();

        if ($user->save() &&  $human->save()) {
            return ['status', '0'];
        } else {
            return ['status', '-1'];
        }
    }
}
