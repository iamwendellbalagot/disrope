import React, {useState} from 'react';
import './Input.css';
 
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const Input = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(message);
        setMessage('');
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
