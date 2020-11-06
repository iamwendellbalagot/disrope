import React from 'react';
import './Message.css';

import Avatar from '@material-ui/core/Avatar';

const Message = () => {
    return (
        <div className='message'>
            <Avatar />
            <div className="message__info">
                <span>Wendell<p>11/06/20</p></span>
                <p>Nibh mauris cursus mattis molestie a. At imperdiet dui accumsan sit amet nulla. Eget dolor morbi non arcu risus. Sed enim ut sem viverra aliquet eget.</p>
            </div>
        </div>
    )
}

export default Message
