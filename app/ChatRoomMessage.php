<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChatRoomMessage extends Model
{
    protected $fillable = ['chat_room_id', 'user_id', 'message'];

    protected $with = ['user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
