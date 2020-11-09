import React, {forwardRef} from 'react';
import './Message.css';

import Avatar from '@material-ui/core/Avatar';

const Message = forwardRef(({username, message, dateSent, userPhoto, isUser}, ref) => {
    return (
        <div className='message' ref={ref}>
            <Avatar 
                src={userPhoto}
            />
            <div className="message__info">
                <span className={isUser && 'isUser'} >{username? username : 'no username'}<p>{new Date(dateSent * 1000).toLocaleTimeString()}</p></span>
                <p>{message}</p>
            </div>
        </div>
    )
});

export default Message
