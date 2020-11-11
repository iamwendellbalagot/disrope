import React, {forwardRef, useRef, useEffect} from 'react';
import './Message.css';

import Iframe from 'react-iframe';
import Avatar from '@material-ui/core/Avatar';

const Message = forwardRef(({username, message, dateSent, userPhoto, isUser, messageType}, ref) => {
    const messageRef =useRef(null);
    const scrollDown =() => {
        messageRef.current.scrollIntoView({
            behavior: "smooth"
        });
    }

    useEffect(() =>{
        scrollDown();
    }, [ref])

    return (
        <div className='message' >
            <Avatar 
                ref={messageRef}
                src={userPhoto}
            />
            <div className="message__info" >
                <span className={isUser? 'isUser' : ''} >{username? username : 'no username'}<p>{new Date(dateSent * 1000).toLocaleTimeString()}</p></span>
                <p ref={ref} >{messageType==='string' && message}</p>
               {messageType==='gif'? <p> <Iframe 
                        src={message.url}
                        height={message.height}
                        width={message.width}
                        title={message.title}
                        frameBorder='0'
                        className='message__info__iframe'
                    /></p>: ''}
                {messageType==='image'? 
                <p><img src={message} alt='Loading...' /></p>
                :''}
            </div>
        </div>
    )
});

export default Message
