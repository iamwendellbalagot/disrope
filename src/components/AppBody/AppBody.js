import React from 'react';
import './AppBody.css';

import Input from '../SubComponents/Input/Input';

import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Message from '../SubComponents/Message/Message';

const AppBody = () => {
    return (
        <div className='appbody'>
            <div className="appbody__header">
                <div className="appbody__headerChannel">
                    <span>#</span>
                    <h3>test-channel</h3>
                </div>
                <div className="appbody__headerIcons">
                    <NotificationsIcon />
                    <PeopleAltIcon />
                </div>
            </div>
            <div className="appbody__chat">
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
            <Input />
        </div>
    )
}

export default AppBody
