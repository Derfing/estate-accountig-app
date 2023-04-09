<?php

namespace App\Classes;

use App\Models\AdditionalAttributes;
use App\Models\Property;
use Attribute;
use Illuminate\Http\Request;

class PropertyControl
{
    static function create(Request $request)
    {
        $property = new Property;

        $property->x = 0;
        $property->y = 0;
        $property->county = $request['region'];
        $property->district = $request['district'];
        $property->street = $request['street'];
        $property->home = $request['home'];
        $property->area = $request['objectArea'];
        $property->state = $request['objectState'];
        $property->owner = $request['owner'];
        $property->type = $request['objectType'];
        $property->actual_user = $request['actualUser'];
        $property->description = $request['description'];

        $property->save();

        if ($request['customAttributes']) {
            foreach ($request['customAttributes'] as $attr) {

                $attribute = new AdditionalAttributes;
                $attribute->object_id = $property->id;
                $attribute->title = $attr['name'];
                $attribute->value = $attr['value'];

                $attribute->save();
            }
        }

        // if (!$property->save()) {
        //     return response(['status' => 'Не удалось сохранить.']);
        // } else {
        //     return response(['status' => 'ok']);
        // }

        return response(['status' => 'ok']);
    }
}
