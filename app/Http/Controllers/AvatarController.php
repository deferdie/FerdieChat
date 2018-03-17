<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AvatarController extends Controller
{
    public function store(Request $request)
    {
        $file = $request->avatar;
        dd($request->input('avatar'));
        $path = $file->store('images', 'public');

        return $path;
    }
}
