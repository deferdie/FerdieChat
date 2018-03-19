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
        this.scrollToLatestMessage = this.scrollToLatestMessage.bind(this);

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

        self.setRoom({id:1});

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
        const element = document.getElementById('chat-app');

        return JSON.parse(element.dataset.user);
    }

    setRoom(room)
    {
        let self = this;

        if (room.id == this.state.currentRoom) {
            return;
        }

        this.setState({
            currentRoom: room.id
        });

        Echo.leave(`room.${room.id}`);

        Echo.join(`room.${room.id}`)
            .here((users) => {
                //console.log(users)
            })
            .joining((user) => {
                //console.log(user.name);
            })
            .leaving((user) => {
                console.log(user);
                user.logged_in = false;
            })
            .listen('MessageWasSent', (e) => {

                let messages = self.state.messages;

                messages.push(e.message);

                self.setState({ messages: messages});

                self.scrollToLatestMessage();
            })

        // Get the messages for the room
        Axios.get('/messages/'+this.state.currentRoom).then(function (response) {
            self.setState({
                messages: response.data
            });

            self.scrollToLatestMessage();

        }).catch(function (error) {
            console.log(error);
        })

    }

    scrollToLatestMessage()
    {
        let chatContainer = document.getElementById('chat-container');

        chatContainer.scrollTop = chatContainer.scrollHeight;
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
                <div className={"col-3 friend-list"}>
                    <Friends setRoom={this.setRoom} getUser={this.getUser} />
                </div>
                <div className={"col-md-9 chat-container"} id="chat-container">
                    {this.state.messages.map(function (message, index) {
                        return (
                           <div key={index}>
                                <div className={"chat " + (self.state.user.id == message.user_id ? 'user col-md-3 offset-md-9' : 'foregin col-md-3')}>
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
                <div className="col-md-3"></div>
                <div className={"col-md-8 chatInput"}>
                    <input className={"form-control"} 
                        value={this.state.message}
                        placeholder="Your last message maybe?"
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.sendMessage(ev.target.value)
                                ev.preventDefault();
                            }
                        }} />
                </div>
                <div className={"col-md-1 chat-icon"}>
                    <i class="fab fa-telegram-plane fa-lg"></i>

                    <i className={"fa fa-smile fa-lg"}></i>
                </div>
            </div>
        );
    }
}

if (document.getElementById('chat-app')) {
    ReactDOM.render(<Chat />, document.getElementById('chat-app'));
}