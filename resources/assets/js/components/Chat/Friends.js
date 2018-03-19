import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import RoomNotification from './RoomNotification'

export default class Friends extends Component {

    constructor(props) {

        super(props);

        let self = this;

        this.onlineBadge = this.onlineBadge.bind(this);
        this.discussionRoom = this.discussionRoom.bind(this);
        this.showChat = this.showChat.bind(this);
        this.updateBadge = this.updateBadge.bind(this);

        this.state = {
            users: [],
            user: self.props.getUser(),
        };

    }

    onlineBadge(loggedIn)
    {
        if (loggedIn == true)
        {
            return <i className="fa fa-circle pull-right" style={{color: "green"}}></i>;
        }
        if(loggedIn == false)
        {
            return <i className="fa fa-circle pull-right" style={{ color: "grey" }}></i>;

        }
    }

    discussionRoom(discussions)
    {
        let self = this;

        let roomId = null;

        discussions.map(function (discussion) {

            if (discussion.foreign_id === self.props.getUser().id)
            {
                roomId = discussion.chat_room_id;
            }
        });
        return roomId;
    }

    componentDidMount()
    {
        let self = this;
        this.getUsers();

        Echo.channel('userSignedIn')
            .listen('UserSignedIn', (e) => {
                self.addUser(e.user);
            })
            .listen('UserSignedOut', (e) => {
                self.removeUser(e.user);
            });
    }

    updateBadge (discussion)
    {
        if(discussion.foreign_id != this.state.user.id)
        {
            return 1;
        }else{
            return 0;
        }
    }

    showChat(user)
    {   
        let self = this;
        Axios.post('/getChat', {user: user}).then(function (response) {
            self.props.setRoom(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }

    getUsers() {
        let self = this;

        Axios.get('/users').then(function (response) {
            self.setState({
                users: response.data.data
            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    addUser(user)
    {
        let newFriends = this.state.users;

        var index = _.findIndex(newFriends, { id: user.id });

        if(index < 0)
        {
            newFriends.push(user);

            this.setState({
                users: newFriends
            });
        }
    }
    
    removeUser(user)
    {
        let removeFriend = this.state.users;

        var index = _.findIndex(removeFriend, { id: user.id });

        removeFriend.splice(index, 1);

        this.setState({
            users: removeFriend
        });
    }

    render() {

        let self = this;
        return (
            <div>
                <ul className={"list-group"}>

                    {this.state.users.map(function (user, index) {
                        console.log('running list')
                        return (
                            <li key={index} className={"list-group-item"} onClick={() => self.showChat(user)}>
                                <img width="20" src={"http://ferdie.chat/storage/" + user.avatar} /> 

                                <span>{user.name}</span>

                                {self.onlineBadge(user.logged_in)}

                                {<RoomNotification room={self.discussionRoom(user.discussion)} />}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}