<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessageWasSent;
use App\ChatRoom;
use App\User;

class ChatController extends Controller
{
    public function index(ChatRoom $chatRoom)
    {
        return $chatRoom->messages()->latest()->orderBy('created_at', 'desc')->orderBy('id', 'asc')->get();
    }

    public function show(Request $request)
    {
        // Check if a chat exists between the users
        $user = auth()->user();

        $chatRoom = null;

        // Enter general chat
        if($request->user['id'] == $user->id)
        {
            $chatRoom = ChatRoom::whereType('general')->first();

        }

        // Check if request user has a chat open with the auth user
        if($chatRoom == null)
        {
            if($user->hasDiscussionWith($request->user['id']))
            {
                $discussion = $user->discussion()->where('foreign_id', $request->user['id'])->first();
    
                $chatRoom = ChatRoom::whereId($discussion->chat_room_id)->first();
    
            }else{
    
                $chatRoom = ChatRoom::create([
                    'type' => 'private'
                ]);
    
                $user->discussion()->create([
                    'foreign_id' => $request->user['id'],
                    'chat_room_id' => $chatRoom->id
                ]);
    
                $foreignUserDiscussion = User::whereId($request->user['id'])->first();
    
                $foreignUserDiscussion->discussion()->create([
                    'foreign_id' => $user->id,
                    'chat_room_id' => $chatRoom->id
                ]);
            }
        }
        

        return $chatRoom;
    }

    public function create(Request $request)
    {
        $chatRoom = ChatRoom::whereId($request->room)->first();

        $message = $chatRoom->messages()->create([
            'user_id' => auth()->user()->id,
            'message' => $request->message
        ]);

        $user = auth()->user();

        broadcast(new MessageWasSent($chatRoom, $message));

        return $message;
    }
}
