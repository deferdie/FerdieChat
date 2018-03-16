<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessageWasSent;

class ChatController extends Controller
{
    public function show(Request $request)
    {
        // Check if a chat exists between the users
        $user = auth()->user();
        
        $chatRoom = \App\ChatRoom::whereType('general')->first();

        if(!$chatRoom)
        {
            $chatRoom = \App\ChatRoom::create([
                'type' => 'general'
            ]);
        }

        return $chatRoom;

    }

    public function newMessage(Request $request)
    {
        $chatRoom = \App\ChatRoom::whereType('general')->first();

        $message = $chatRoom->messages()->create([
            'user_id' => auth()->user()->id,
            'message' => 'Please work'
        ]);

        if($chatRoom->type == 'general')
        {
            $user = auth()->user();
            broadcast(new MessageWasSent($chatRoom, $message));
        }

        return $message;
    }
}
