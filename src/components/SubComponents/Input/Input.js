import React, {useState} from 'react';
import './Input.css';

import {getChannel, getServer} from '../../../reduxSlices/appSlice';
import {getUser} from '../../../reduxSlices/userSlice';
import {useSelector, useDispatch} from 'react-redux';

import firebase from 'firebase';
import {db} from '../../../firebase';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const Input = () => {
    const [message, setMessage] = useState('');
    const user = useSelector(getUser);
    const selectedServer = useSelector(getServer);
    const selectedChannel = useSelector(getChannel);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(selectedServer && selectedChannel){
            db.collection('server')
            .doc(selectedServer.serverID)
            .collection('textChannel')
            .doc(selectedChannel.channelID)
            .collection('messages')
            .add({
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.username,
                userPhoto: user.userPhoto,
                userUID: user.userUID
            })
            setMessage('');
        } else return
        
    }
    return (
        <div className='input'>
            <form className='input__form' onSubmit={handleSubmit}>
                <AddCircleIcon />
                <input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type='text' 
                    placeholder='Message #test-channel' />
                <button type='submit'>Send</button>
                <GifIcon />
                <EmojiEmotionsIcon />
            </form>
        </div>
        
    )
}
export default Input
