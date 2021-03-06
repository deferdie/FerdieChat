<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->transform(function($user){
                return [
                    'id' => $user->id, 
                    'name' => $user->name,
                    'discussion' => $user->discussion,
                    'avatar' => $user->avatar,
                    'logged_in' => $user->logged_in,
                ];
            }),
        ];

    }
}
