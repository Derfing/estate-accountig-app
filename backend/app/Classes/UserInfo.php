<?php

namespace App\Classes;

use App\Models\Human;
use App\Models\ObjectOfAgenda;
use App\Models\User;
use App\Models\Job;
use App\Models\Property;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Cast\Object_;

class UserInfo
{
    static function getProfile($login)
    {
        $user = User::where('login', $login)->first();
        $human = Human::where('id', $user->human_id)->first();
        $objectsId = Job::select('object_id')->where('responsible_worker_login', $login)->get()->unique();
        foreach ($objectsId as $object) {
            $obj = ObjectOfAgenda::select('property_id', 'decision')->where('id', $object->object_id)->first();
            $prop = Property::select('street', 'home')->where('id', $obj['property_id'])->first();
            $objects[$object->object_id] = [
                'decision' => $obj->dicision,
                'home' => $prop['home'],
                'street' => $prop['street']
            ];
        }
        if (isset($user) && isset($human) && isset($objectsId)) {
            $result = [
                'first_name' => $human->first_name,
                'last_name' => $human->surname,
                'patronymic' => $human->patronymic,
                'speciality' => $user->speciality,
                'objects' => $objects
            ];
            return response($result);
        }
        else
            return response('Not complete data for this user');
    }

    static function login(Request $request)
    {
        $login = $request['login'];
        $password = $request['password'];

        if ($login && $password) {
            $user = User::where('login', $login)->first();
            if ($user) {
                if ($user->password == $password) {
                    return response(['is_loginned' => true, 'role' => $user->role, 'status' => '0']);
                } else {
                    return response(['is_loginned' => false, 'status' => '2']);
                }
            } else {
                return response(['is_loginned' => false, 'status' => '1']);
            }
        }
    }
}
