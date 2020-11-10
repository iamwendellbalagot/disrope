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

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import ReactGiphySearchbox from 'react-giphy-searchbox';

const Input = () => {
    const [message, setMessage] = useState('');
    const [openEmojiPicker, setEmojiPicker] = useState(false);
    const [openGifPicker, setGifPicker] = useState(false);
    const user = useSelector(getUser);
    const selectedServer = useSelector(getServer);
    const selectedChannel = useSelector(getChannel);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!message){
            return
        }
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
                userUID: user.userUID,
                type: 'string'
            })
            setMessage('');
        } else return
        
    }

    const addGif = e =>{
        console.log(e)
        if(selectedServer && selectedChannel){
            db.collection('server')
            .doc(selectedServer.serverID)
            .collection('textChannel')
            .doc(selectedChannel.channelID)
            .collection('messages')
            .add({
                message: {
                    url: e.embed_url,
                    height: e.images.downsized.height,
                    width: e.images.downsized.width,
                    title: e.title
                },
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.username,
                userPhoto: user.userPhoto,
                userUID: user.userUID,
                type: 'gif'
            })
        }
    }

    const addEmoji = e =>{
        setMessage(message + e.native)
        setEmojiPicker(false);
    }
    

    return (
        <div className='input'>
            <form className='input__form' onSubmit={handleSubmit}>
                <AddCircleIcon />
                <input 
                    disabled={!selectedChannel}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type='text' 
                    placeholder='Message #test-channel' />
                <button type='submit'>Send</button>
                <GifIcon onClick={() => {setGifPicker(!openGifPicker); setEmojiPicker(false)}} />
                <EmojiEmotionsIcon onClick={() => {setEmojiPicker(!openEmojiPicker); setGifPicker(false)}} />
                {openEmojiPicker?<Picker onSelect={addEmoji}
                    style={{position:'absolute', right: '200px', bottom:'70px'}} />: null}
            </form>
            {openGifPicker?<div style={{position:'absolute', bottom:'70px', right: '200px'}}>
                <ReactGiphySearchbox 
                    apiKey='6APF3O8G66WwXMy6iNOh22fhpsWJqLtc'
                    onSelect={addGif} />
            </div>: null}
        </div>
        
    )
}
export default Input
