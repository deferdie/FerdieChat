<?php
use App\Events\MessageWasSent;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Broadcast::routes();


Route::get('/home', 'HomeController@index')->name('home');

// Users
Route::get('/users', 'UserController@index')->name('getUsers');

Route::get('/user', function(){
    return auth()->user();
});


Route::post('/getChat', 'ChatController@show');

Route::get('/messages/{chatRoom}', 'ChatController@index');
Route::post('/message', 'ChatController@create');