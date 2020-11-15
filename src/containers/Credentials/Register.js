import React, {useState} from 'react';
import { Link} from 'react-router-dom';
import firebase from 'firebase';
import {auth, db} from '../../firebase';
import './Credentials.css';

import {useDispatch} from 'react-redux';
import {login} from '../../reduxSlices/userSlice';

const Credentials = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password !== confPassword) {
            setError('auth/pass-not-matched')
            return
        }

        if(email && username && password && confPassword){
            auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                res.user.updateProfile({
                    displayName: username
                })
                .then(_res =>{
                    db.collection('server')
                    .doc('cbnoGl5qk54qID8I4QFt')
                    .update({
                        members: firebase.firestore.FieldValue.arrayUnion(res.user.uid)
                    })
                    .then(__res => {
                        db.collection('server')
                        .doc('cbnoGl5qk54qID8I4QFt')
                        .collection('serverMembers')
                        .add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            userPhoto: res.user.photoURL,
                            userUID: res.user.uid,
                            username: res.user.displayName
                        })
                        .then(___res =>{
                            dispatch(login({
                                userUID: res.user.uid,
                                userPhoto: res.user.photoURL,
                                username: res.user.displayName
                            }));
                            setEmail('');
                            setPassword('');
                            return
                        })
                    })
                })
            })  
            .catch(err => {
                setError(err.code)
            });
        }
    }
    return (
        <div className='credentials'>
            <img
                className='credentials__image' 
                src='Logo.png'
                 alt='Logo' />
                <form className="credentials__form credentials__register" onSubmit={handleSubmit}>
                    <h2>Hello user!</h2>
                    <p>We are so exited to have you here!</p>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email"
                            className ={error==='auth/email-already-in-use'? 'error': ''}
                            value={email? email: ''} 
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder='Type your email'/>
                    </div>
                    <div>
                        <label>Username:</label>
                        <input 
                            type="text"
                            value={username} 
                            onChange={(e)=>setUsername(e.target.value)}
                            placeholder='Type your username'/>
                    </div>  
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password"
                            className={error==='auth/pass-not-matched'? 'error': ''} 
                            value={password? password: ''}
                            onChange={(e)=> setPassword(e.target.value)}
                            placeholder='Password'/>
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input 
                            type="password" 
                            className={error==='auth/pass-not-matched'? 'error' : ''} 
                            value={confPassword}
                            onChange={(e)=> setConfPassword(e.target.value)}
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
