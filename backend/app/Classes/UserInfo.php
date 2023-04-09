<?php

namespace App\Classes;

use App\Models\Human;
use App\Models\ObjectOfAgenda;
use App\Models\User;
use App\Models\Job;
use App\Models\Property;
use Illuminate\Http\Request;

class UserInfo
{
    static function getProfile($login)
    {
        $user = User::find($login);
        if (!$user) {
            return response(['status' => 'Не существует пользователя с таким логином или он неправильно заполнен.']);
        }
        $human = Human::find($user->human_id);
        if (!$human) {
            return response(['status' => 'Не существует пользователя с таким логином или он неправильно заполнен.']);
        }


        $objectsId = Job::select('object_id')->where('responsible_worker_login', $login)->groupBy('object_id')->get();

        foreach ($objectsId as $object) {
            $obj = ObjectOfAgenda::select('property_id', 'decision')->where('id', $object->object_id)->first();
            $prop = Property::select('street', 'home')->where('id', $obj['property_id'])->first();
            $objects[$object->object_id] = [
                'decision' => $obj->dicision,
                'home' => $prop['home'],
                'street' => $prop['street']
            ];
        }

        $result = [
            'first_name' => $human->first_name,
            'last_name' => $human->surname,
            'patronymic' => $human->patronymic,
            'speciality' => $user->speciality,
            'role' => $user->role,
            'objects' => $objects
        ];

        if (!$result) {
            return response(['status' => 'Ошибка во время генерации ответа.']);
        } else {
            return response(['status' => 'ok', 'result' => $result]);
        }
    }

    static function login(Request $request)
    {
        $login = $request['login'];
        $password = $request['password'];

        if (!$login || !$password) {
            return response(['status' => 'Неправильно введен логин или пароль.']);
        } else {
            $user = User::where('login', $login)->first();
            if ($user) {
                if ($user->password == $password) {
                    $result = ['role' => $user->role];
                    return response(['status' => 'ok', 'result' => $result]);
                } else {
                    return response(['status' => 'Неверный пароль.']);
                }
            } else {
                return response(['status' => 'Неверный логин.']);
            }
        }
    }
}
