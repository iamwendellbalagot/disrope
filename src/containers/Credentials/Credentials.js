import React, {useState} from 'react';
import {Route, Link} from 'react-router-dom';
import {auth, googleProvider} from '../../firebase';
import './Credentials.css';

const Credentials = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(res => {
            setEmail('');
            setPassword('');
        })
        .catch(err => {
            setError(err.code)
        })
    }

    const googleSignIn = () =>{
        auth.signInWithPopup(googleProvider)
        .catch(err => {
            setError(err.code)
        })
    }

    return (
        <div className='credentials'>
            <img src='Logo.png'
                 alt='Logo' />
                <form className="credentials__form" onSubmit={handleSubmit}>
                    <h2>Welcome back!</h2>
                    <p>We are so exited to see you again!</p>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email"
                            className={error==='auth/user-not-found'? 'error': ''}
                            value={email? email: ''} 
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder='Type your email'/>
                    </div> 
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            className={error==='auth/wrong-password'? 'error': ''}
                            value={password? password: ''}
                            onChange={(e)=> setPassword(e.target.value)}
                            placeholder='Password'/>
                    </div>   
                    <button type='submit' >Log in</button>
                    <div onClick={googleSignIn} className="credentials__formGoogle">Log in with Google</div>
                    <div className="credentials__formRegister">
                        <p>Need an account? <Link to='/register' >Register</Link></p>
                    </div>
                </form>
        </div>
    )
}

export default Credentials;
