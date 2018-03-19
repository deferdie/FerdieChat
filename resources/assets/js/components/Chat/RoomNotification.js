import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

export default class RoomNotification extends Component {

    constructor(props){
        super(props);

        this.state = {
            room : null,
            notifications : 0,
            currentRoom : 1
        };
    }

    componentDidMount()
    {
        let self = this;

        Echo.join(`room.${this.props.room}`)
            .listen('MessageWasSent', (e) => {
                if (e.chat_room_id != self.state.currentRoom)
                {
                    let count = self.state.notifications + 1;
                    self.setState({
                        notifications : count
                    })
                }
            })
    }

    render() {
        let self = this;

        return (
            <span>
                {(self.state.notifications == 0 ? null : <span className={"badge badge-success"}>{self.state.notifications}</span>) }
            </span>
        )

    }

}