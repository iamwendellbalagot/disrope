import React, {forwardRef, useRef, useEffect} from 'react';
import './Message.css';

import Iframe from 'react-iframe';
import Avatar from '@material-ui/core/Avatar';

const Message = forwardRef(({username, message, dateSent, userPhoto, isUser, type}, ref) => {
    const messageRef =useRef(null);
    const scrollDown =() => {
        messageRef.current.scrollIntoView({
            behavior: 'smooth',
            block:'nearest',
            inline: 'start'
        });
    }

    useEffect(scrollDown, [message])

    return (
        <div className='message' ref={ref}>
            <Avatar 
                ref={messageRef}
                src={userPhoto}
            />
            <div className="message__info" >
                <span className={isUser? 'isUser' : ''} >{username? username : 'no username'}<p>{new Date(dateSent * 1000).toLocaleTimeString()}</p></span>
                <p>{type==='string'? message:null}</p>
                <p>{type==='gif'? <Iframe 
                        src={message.url}
                        height={message.height}
                        width={message.width}
                        frameBorder='0'
                    />: null}</p>
            </div>
        </div>
    )
});

export default Message
