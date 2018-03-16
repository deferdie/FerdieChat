import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

export default class Friends extends Component {

    constructor(props) {

        super(props);

        this.showChat = this.showChat.bind(this);

        this.state = {
            users: [],
            user: null
        };

        this.getUsers();
    }

    componentDidMount()
    {
        let self = this;

        Echo.channel('userSignedIn')
            .listen('UserSignedIn', (e) => {
                self.addUser(e.user);
            })
            .listen('UserSignedOut', (e) => {
                console.log('removing user');
                self.removeUser(e.user);
            });
    }

    showChat(user)
    {
        let self = this;
        Axios.post('/getChat', {user: user}).then(function (response) {
            console.log
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

    setUser() {
        let self = this;

        Axios.get('/user').then(function (response) {
            self.setState({
                user: response.data
            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    addUser(user)
    {
        console.log(user);

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
        console.log(user);

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
                <ul class="list-group">

                    {this.state.users.map(function (user, index) {                        
                        return (
                            <li class="list-group-item" onClick={() => self.showChat(user)}>
                                {user.name} 
                            </li>
                        )
                    })}
     
                </ul>
                
            </div>
        );
    }
}