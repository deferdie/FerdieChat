<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Discussion extends Model
{
    protected $fillable = ['user_id', 'foreign_id', 'chat_room_id'];
}
