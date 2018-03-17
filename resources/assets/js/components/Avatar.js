import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

export default class Avatar extends Component
{

    constructor(props)
    {
        super(props);

        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleFileUpload()
    { 
        const file = document.getElementById('avatarUpload');

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        var formData = new FormData();
        formData.append("avatar", file.files[0].name);

        Axios.post('/avatar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
           
        }).catch(function (error) {
            console.log(error);
        })
    }


    // Render the component
    render()
    {
        return (
            <div className={"modal fade"} id="avatar-modal" tabIndex={"-1"} role="dialog">
                <div className={"modal-dialog"} role="document">
                    <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"}>Modal title</h5>
                        <button type="button" className={"close"} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={"modal-body"}>
                        <form id="avatar-upload">
                            <div className={"form-group"}>
                                <label htmlFor={"avatarUpload"}>Upload Avatar</label>
                                <input type="file" id="avatarUpload" className={"form-control"} placeholder="Your avatar" />
                            </div>
                        </form>
                    </div>
                    <div className={"modal-footer"}>
                        <button type="button" className={"btn btn-primary"} onClick={this.handleFileUpload}>Save changes</button>
                        <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

if(document.getElementById('avatar'))
{
    ReactDOM.render(<Avatar />, document.getElementById('avatar'));
}