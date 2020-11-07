import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser, getServers} from '../../reduxSlices/userSlice';
import firebase from 'firebase';
import {db} from '../../firebase';

import AppBody from '../../components/AppBody/AppBody';
import Members from '../../components/Members/Members';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Home.css';
import Modal from '../../components/Modal/Modal';
import Avatar from '@material-ui/core/Avatar';

const Home = () => {
    const user = useSelector(getUser);
    const userServers = useSelector(getServers);
    const [serverInput, setServerinput] = useState('');
    const [modalStatus, setModalStatus] = useState(false);

    const handleModal = () => {
        setModalStatus(!modalStatus);
    }

    const handleCreateServer = () =>{
        db.collection('server')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            serverName: serverInput?serverInput: 'none',
            creatorUID: user.userUID,
            creatorName: user.username
        }).then(res => {
            console.log('Created Server Succesfully');
            setModalStatus(!modalStatus)
            setServerinput('');
        })
    }

    return (
        <div className='home'>
            <Sidebar 
                uid={user?.userUID}
                userPhoto={user?.userPhoto}
                username={user?.username}
                handleModal={handleModal}
                userServers= {userServers} />
            <AppBody />
            <Members />
            <Modal open={modalStatus} >
                <div className="home__createServer">
                    <Avatar 
                    src='https://www.clipartmax.com/png/middle/307-3072095_discord-icon-by-rengatv-cool-server-icons-discord.png'
                    style={{height: '70px', width:'70px'}} />
                    <input 
                        type='text'
                        value={serverInput} 
                        placeholder='Server name' 
                        onChange={(e) => setServerinput(e.target.value)} />
                    <button onClick={handleCreateServer} >Create</button>
                </div>
            </Modal>
        </div>
    )
}

export default Home;
