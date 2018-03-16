import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Friends from './Chat/Friends'

export default class Example extends Component {
    render() {
        return (
            <div class="col-md-4">
                <Friends />
            </div>
        );
    }
}

if (document.getElementById('chat-app')) {
    ReactDOM.render(<Example />, document.getElementById('chat-app'));
}
