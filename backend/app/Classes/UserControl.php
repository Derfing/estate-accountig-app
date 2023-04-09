<?php

namespace App\Classes;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Human;
use Symfony\Component\HttpFoundation\RequestMatcher\PathRequestMatcher;

class UserControl
{
    static function editUserWithHuman(Request $request, $login)
    {
        $firstname = $request['firstname'];
        $lastname = $request['lastname'];
        $patronymic = $request['patronymic'];
        $speciality = $request['speciality'];

        if (!$firstname || !$lastname || !$patronymic || !$speciality) {
            return response(['status' => 'Недостаточно введены данные запроса']);
        }

        $user = User::find($login);
        $human = Human::find($user->human_id);

        if (!$user || !$human) {
            return response(['status' => 'Не существует пользователя с таким логином или он неправильно заполнен.']);
        }

        $user->speciality = $speciality;
        $human->surname = $lastname;
        $human->first_name = $firstname;
        $human->patronymic = $patronymic;

        if ($user->save() &&  $human->save()) {
            return ['status' => 'ok'];
        } else {
            return ['status' => 'Ошибка при сохранении пользователя.'];
        }
    }

    static function deleteUserWithHuman($login)
    {
        $user = User::find($login);
        $human = Human::find($user->human_id);

        if (!$user || !$human) {
            return response(['status' => 'Не существует пользователя с таким логином или он неправильно заполнен.']);
        }

        if ($user->forceDelete() && $human->forceDelete())
            return response(['status' => 'ok']);
        else
            return response(['status' => 'Не удалось удалить пользователя полностью.']);
    }
}
