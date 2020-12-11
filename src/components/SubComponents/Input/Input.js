import React, {useState, useEffect} from 'react';
import './Input.css';

import {getChannel, getServer} from '../../../reduxSlices/appSlice';
import {getUser} from '../../../reduxSlices/userSlice';
import {useSelector, useDispatch} from 'react-redux';

import firebase from 'firebase';
import {db, storage, auth} from '../../../firebase';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import ReactGiphySearchbox from 'react-giphy-searchbox';
import { Button } from '@material-ui/core';

const Input = () => {
    const [message, setMessage] = useState('');
    const [inputImage, setInputImage] = useState(null);
    const [openEmojiPicker, setEmojiPicker] = useState(false);
    const [openGifPicker, setGifPicker] = useState(false);
    const user = useSelector(getUser);
    const selectedServer = useSelector(getServer);
    const selectedChannel = useSelector(getChannel);

    const acceptedFiles = ['image/jpeg', 'image/png', 'image/jpg']

    useEffect(() => {
        if(acceptedFiles.includes(inputImage?.type) && 
        selectedServer && selectedChannel){
            console.log(inputImage)
            const uploadTask = storage.ref(`sentImages/${inputImage.name}`).put(inputImage);
            uploadTask.on(
                'state-change',
                (snapshot) =>{},
                (error) =>{console.log(error.message)},
                () => {
                    storage.ref('sentImages')
                    .child(inputImage.name)
                    .getDownloadURL()
                    .then(url =>{
                        db.collection('server')
                        .doc(selectedServer.serverID)
                        .collection('textChannel')
                        .doc(selectedChannel.channelID)
                        .collection('messages')
                        .add({
                            message: url,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            user: user.username,
                            userPhoto: user.userPhoto,
                            userUID: user.userUID,
                            type: 'image'
                        })
                    })
                }
            )
            
        }
    }, [inputImage])

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
            setGifPicker(false)
        }
    }

    const addEmoji = e =>{
        setMessage(message + e.native)
        setEmojiPicker(false);
    }

    const handleGifPicker = () =>{
        if(selectedChannel && selectedServer){
            setGifPicker(!openGifPicker); 
            setEmojiPicker(false);
        }
    }

    const handleEmojiPicker = () => {
        if(selectedServer && selectedChannel){
            setEmojiPicker(!openEmojiPicker); 
            setGifPicker(false);
        }
    }
    
    return (
        <div className='input'>
            <form className='input__form' onSubmit={handleSubmit}>
                <label >
                    +
                    <input 
                        onChange={(e) => setInputImage(e.target.files[0])} 
                        style={{display:'none'}} type='file' />
                </label>
                <input 
                    disabled={!selectedChannel}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type='text' 
                    placeholder='Message #test-channel' />
                <button type='submit'>Send</button>
                <GifIcon onClick={handleGifPicker} />
                <EmojiEmotionsIcon onClick={handleEmojiPicker} />
                {openEmojiPicker?
                <div style={{position:'absolute', right: '200px', bottom:'70px'}}>
                    <Picker onSelect={addEmoji} />
                </div>: null}
                     
            </form>
            {openGifPicker && selectedChannel?<div style={{position:'absolute', bottom:'70px', right: '200px'}}>
                <ReactGiphySearchbox 
                    apiKey='6APF3O8G66WwXMy6iNOh22fhpsWJqLtc'
                    onSelect={addGif} />
            </div>: null}
        </div>
    )
}
export default Input
