import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class UserStatusBadge extends Component{

    constructor(props)
    {
        super(props);
        console.log(this.props.status);
    }

    render()
    {
        return (
            <i className={"fa fa-circle pull-right " + (this.props.status ? 'onlineBadge' : 'offlineBadge')}></i>
        );
    }
}