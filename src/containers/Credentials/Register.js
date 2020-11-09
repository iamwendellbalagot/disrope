import React, {useState} from 'react';
import { Link} from 'react-router-dom';
import {auth} from '../../firebase';
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
    return (
        <div className='credentials'>
            <img src='https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/1200px-Discord_logo.svg.png'
                 alt='Logo' />
                <form className="credentials__form credentials__register" onSubmit={handleSubmit}>
                    <h2>Hello user!</h2>
                    <p>We are so exited to have you here!</p>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email"
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
                    <div>
                        <label>Confirm Password:</label>
                        <input 
                            type="password" 
                            value={password? password: ''}
                            onChange={(e)=> setPassword(e.target.value)}
                            placeholder='Confirm Password'/>
                    </div>      
                    <button type='submit' >Register</button>
                    <div className="credentials__formRegister">
                        <p>Already have an account? <Link to='/login' >Login</Link></p>
                    </div>
                </form>
        </div>
    )
}

export default Credentials;
