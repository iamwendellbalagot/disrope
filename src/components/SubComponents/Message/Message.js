import React from 'react';
import './Message.css';

import Avatar from '@material-ui/core/Avatar';

const Message = ({username, message, dateSent}) => {
    return (
        <div className='message'>
            <Avatar 
                src='https://pbs.twimg.com/profile_images/1215688870672515072/ry9ZejZF_400x400.jpg'
            />
            <div className="message__info">
                <span>{username}<p>{new Date(dateSent * 1000).toLocaleTimeString()}</p></span>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
