<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserCollection;
use App\User;

class UserController extends Controller
{
    public function index()
    {
        $users = new UserCollection(User::where('logged_in', true)->get());
        return $users;
    }
}
