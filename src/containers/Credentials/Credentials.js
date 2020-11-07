import React, {useState} from 'react';
import {auth, googleProvider} from '../../firebase';
import './Credentials.css';

const Credentials = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
        console.log(password);
        auth.signInWithEmailAndPassword(email, password)
        .catch(err => alert(err.message))
        setEmail('');
        setPassword('');
    }

    const googleSignIn = () =>{
        auth.signInWithPopup(googleProvider)
        .catch(err => alert(err.message))
    }

    return (
        <div className='credentials'>
            <img src='https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/1200px-Discord_logo.svg.png'
                 alt='Logo' />
            <form className="credentials__form" onSubmit={handleSubmit}>
                <h2>Welcome back!</h2>
                <p>We are so exited to see you again!</p>
                <div>
                    <label>Email:</label>
                    <input 
                        type="text"
                        value={email? email: ''} 
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder='Type your email'/>
                </div> 
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password? password: ''}
                        onChange={(e)=> setPassword(e.target.value)}
                        placeholder='Password'/>
                </div>   
                <button type='submit' >Log in</button>
                <div onClick={googleSignIn} className="credentials__formGoogle">Log in with Google</div>
                <div className="credentials__formRegister">
                    <p>Need an account? <span>Register</span></p>
                </div>
            </form>
        </div>
    )
}

export default Credentials;
