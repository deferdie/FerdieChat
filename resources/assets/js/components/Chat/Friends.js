import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

export default class Friends extends Component {

    constructor(props) {

        super(props);

        this.showChat = this.showChat.bind(this);
        this.updateBadge = this.updateBadge.bind(this);

        this.state = {
            users: [],
            user: this.props.getUser()
        };

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

        this.state.user.discussion.map(function (discussion, index) {
            Echo.join(`room.${discussion.chat_room_id}`)
                .listen('MessageWasSent', (e) => {
                    self.updateBadge (discussion);
                })
        })
    }

    updateBadge (discussion)
    {
        console.log(discussion.foreign_id);
        console.log(discussion.foreign_id);
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
                        return (
                            <li key={index} className={"list-group-item"} onClick={() => self.showChat(user)}>
                                {user.name} <span className={"badge badge-primary"}>
                                    {self.updateBadge (user.discussion)}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}