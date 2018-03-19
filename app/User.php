<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'logged_in', 'avatar'
    ];

    protected $with = ['discussion'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function discussion()
    {
        return $this->hasMany(Discussion::class);
    }

    public function canJoinRoom()
    {
        return true;
    }
    
    public function hasDiscussionWith($foreignId)
    {
        if($this->discussion()->where('foreign_id', $foreignId)->where('user_id', auth()->user()->id)->count() > 0)
        {
            return true;
        }
    }



}
