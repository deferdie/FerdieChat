<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AvatarController extends Controller
{
    public function store(Request $request)
    {
        $file = $request->file('avatar');

        $path = $file->store('images', 'public');

        $user = auth()->user();

        $user->avatar = $path;

        $user->save();

        return $path;
    }
}
