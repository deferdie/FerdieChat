<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{
    protected $fillable = ['type'];

    public function messages()
    {
        return $this->hasMany(ChatRoomMessage::class);
    }
}
