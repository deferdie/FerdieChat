import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Friends from './Friends'
import Axios from 'axios';

export default class Chat extends Component {

    constructor(props)
    {
        super(props);

        this.setRoom = this.setRoom.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        const element = document.getElementById('chat-app')

        this.state = {
            messages: [],
            user: JSON.parse(element.dataset.user),
            currentRoom: 1,
        };

        let self = this;
    }

    componentDidMount() {
        let self = this;

        Echo.join(`room.${this.state.currentRoom}`)
            .here((users) => {

            })
            .joining((user) => {
                

            })
            .leaving((user) => {

            })
            .listen('MessageWasSent', (e) => {

                let messages = self.state.messages;

                messages.push(e.message);

                self.setState({ messages: messages});
            })

        // Get the messages for the room
        Axios.get('/messages/'+this.state.currentRoom).then(function (response) {
            self.setState({
                messages: response.data
            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    getUser()
    {
        const element = document.getElementById('chat-app')

        return JSON.parse(element.dataset.user);
    }

    setRoom(room)
    {
        let self = this;

        this.setState({
            currentRoom: room.id
        });

        Echo.leave('orders');

        Echo.join(`room.${room.id}`)
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
            });

        // Get the messages for the room
        Axios.get('/messages/'+this.state.currentRoom).then(function (response) {
            self.setState({
                messages: response.data
            });
        }).catch(function (error) {
            console.log(error);
        })

    }

    sendMessage(message)
    {
        let self = this;

        Axios.post('/message', {
            message: message,
            room: self.state.currentRoom,
        })
        .then(function (response) {

        }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        let self = this;

        return (
            <div className={"row"}>
                <div className={"col-3"}>
                    <Friends setRoom={this.setRoom} getUser={this.getUser} />
                </div>
                <div className={"col-md-9 chat-container"}>
                    {this.state.messages.map(function (message, index) {
                        return (
                           <div key={index}>
                                <div className={"chat " + (self.state.user.id == message.user_id ? 'user col-md-11 offset-md-1' : 'foregin col-md-11')}>
                                    <div className={"message"}>
                                        <small>
                                            {message.user.name}
                                        </small>
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                                <br />   
                            </div>
                        )
                    })}
                </div>
                <br />
                <div className={"col-md-12"}>
                    <p>Your message</p>
                        <input className={"form-control"} value={this.state.message} placeholder="Your last message maybe?" onKeyPress={(ev) => {
                                                                                            if (ev.key === 'Enter') {
                                                                                            this.sendMessage(ev.target.value)
                                                                                            ev.preventDefault();
                                                                                            }
                                                                                        }} />
                    </div>
            </div>
        );
    }
}

if (document.getElementById('chat-app')) {
    ReactDOM.render(<Chat />, document.getElementById('chat-app'));
}