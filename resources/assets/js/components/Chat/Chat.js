import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Friends from './Friends'
import Axios from 'axios';

export default class Chat extends Component {

    constructor(props)
    {
        super(props);

        this.setRoom = this.setRoom.bind(this);

        this.setUser();

        this.state = {
            messages: [],
            user: null,
            currentRoom: 1
        };
    }

    componentDidMount() {
        let self = this;
    }

    setUser()
    {
        let self = this;

        Axios.get('/user').then(function (response) {
            self.setState({
                user: response.data
            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    setRoom(room)
    {
        let self = this;

        this.setState({
            currentRoom: room.id
        })

        Echo.join(`room.${this.state.currentRoom}`)
            .here((users) => {
                console.log(users)
            })
            .joining((user) => {
                console.log(user.name);
            })
            .leaving((user) => {
                console.log(user.name);
            })
            .listen('MessageWasSent', (e) => {

                let messages = self.state.messages;

                messages.push(e.message);

                self.setState({ messages: messages});

                console.log(self.state.messages);
            });
    }

    render() {
        let self = this;
        return (
            <div class="row">
                <div class="col-3">
                    <Friends setRoom={this.setRoom} />
                </div>
                <div class="col-md-9">
                    {this.state.messages.map(function (message, index) {
                        return (
                           <div>
                                <div>
                                    <div class="message user">
                                        <small class="" className={"btn-group pull-right " + (self.state.user.id === message.user_id ? 'float-right' : 'float-left')}>
                                            {message.user.name}
                                        </small>
                                        <br />
                                        <p class="" className={"btn-group pull-right " + (self.state.user.id === message.user_id ? 'float-right' : 'float-left')}>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                                <br />   
                            </div>
                        )
                    })}

                </div>
            </div>
        );
    }
}

if (document.getElementById('chat-app')) {
    ReactDOM.render(<Chat />, document.getElementById('chat-app'));
}