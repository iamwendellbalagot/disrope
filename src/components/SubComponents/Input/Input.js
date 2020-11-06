import React from 'react';
import './Input.css';
 
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const Input = () => {
    return (
        <div className='input'>
            <form className='input__form'>
                <AddCircleIcon />
                <input type='text' placeholder='Message #test-channel' />
                <button type='submit'>Send</button>
                <GifIcon />
                <EmojiEmotionsIcon />
            </form>
        </div>
        
    )
}
export default Input
