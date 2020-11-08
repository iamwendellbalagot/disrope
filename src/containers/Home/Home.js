import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser, getServers} from '../../reduxSlices/userSlice';
import {getServer} from '../../reduxSlices/appSlice';
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
    const selectedServer = useSelector(getServer);

    const [serverInput, setServerinput] = useState('');
    const [channelInput, setChannelInput] = useState('');
    const [modalStatus, setModalStatus] = useState(false);
    const [createChannelSt, setCreateChannelSt] = useState(false);

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

    const openModal =() =>{
        setCreateChannelSt(!createChannelSt)
        console.log('Create a channel');
    }

    const handleCreateChannel = (type) =>{
        db.collection('server')
        .doc(selectedServer.serverID)
        .collection('textChannel')
        .add({
            channelName: channelInput,
            creatorUID: user.userUID,
            creatorName: user.username,
            message: [],
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(res => {
            console.log('Succesfully created a channel');
        })
        setChannelInput('');
        setCreateChannelSt(!createChannelSt)
    }

    return (
        <div className='home'>
            <Sidebar 
                uid={user?.userUID}
                userPhoto={user?.userPhoto}
                username={user?.username}
                handleModal={handleModal}
                openModal = {openModal}
                userServers= {userServers} />
            <AppBody />
            <Members />
            {/* MODAL TO CREATE A SERVER */}
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
            <Modal open={createChannelSt}>
                <div className="home__createChannel">
                    <p>#{channelInput? channelInput : 'Channel Name'}</p>
                    <input 
                        type='text'
                        value={channelInput}
                        onChange={(e) => setChannelInput(e.target.value)}
                        placeholder='Type channel name'
                    />
                    <button onClick={handleCreateChannel} >Create</button>
                </div>
            </Modal>
            {/* MODAL TO CREATE A CHANNEL */}
        </div>
    )
}

export default Home;
