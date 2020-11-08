import React from 'react';
import './AppBody.css';

import {useDispatch, useSelector} from 'react-redux';
import {getChannel} from '../../reduxSlices/appSlice';

import Input from '../SubComponents/Input/Input';

import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Message from '../SubComponents/Message/Message';

const AppBody = () => {

    const selectedChannel = useSelector(getChannel);
    return (
        <div className='appbody'>
            <div className="appbody__header">
                <div className="appbody__headerChannel">
                    <span>#</span>
                    <h3>{selectedChannel?.channelName}</h3>
                </div>
                <div className="appbody__headerIcons">
                    <NotificationsIcon />
                    <PeopleAltIcon />
                </div>
            </div>
            <div className="appbody__chat">
                <Message />
                <Message />
            </div>
            <Input />
        </div>
    )
}

export default AppBody
