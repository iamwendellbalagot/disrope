import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser, getServers, login} from '../../reduxSlices/userSlice';
import {getServer, setServer} from '../../reduxSlices/appSlice';
import firebase from 'firebase';
import {db, auth, storage} from '../../firebase';

import AppBody from '../../components/AppBody/AppBody';
import Members from '../../components/Members/Members';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Home.css';
import Modal from '../../components/Modal/Modal';
import Avatar from '@material-ui/core/Avatar';
import { Tooltip, LinearProgress } from '@material-ui/core';

const ICON = 'https://www.clipartmax.com/png/middle/307-3072095_discord-icon-by-rengatv-cool-server-icons-discord.png';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const userServers = useSelector(getServers);
    const selectedServer = useSelector(getServer);

    const [error, setError] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [btnSaveDsbl, setBtnSaveDsbl] = useState(true); 
    const [progressValue, setProgressValue] = useState(0);
    const [serverInput, setServerinput] = useState('');
    const [channelInput, setChannelInput] = useState('');
    const [editServerInput,setEditServerInput] = useState('');
    const [editUserInput, setEditUserInput] = useState('');
    const [serverImage, setServerImage] = useState(null);
    const [serverImageURL, setServerImageURL] = useState(selectedServer?.serverPhoto? selectedServer.serverPhoto : ICON);
    const [userImage, setUserImage] = useState(null);
    const [userImageURL, setUserImageURL] = useState(user?.userPhoto? user.userPhoto : '');

    const [modalStatus, setModalStatus] = useState(false);
    const [createChannelSt, setCreateChannelSt] = useState(false);
    const [editServer, setEditServer] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [joinServer, setJoinServer] = useState(false);
    const [joinServerInput, setJoinServerInput] = useState('');
    const [members, setMembers] = useState([]);

    useEffect(() => {
        if(!modalStatus){
            setJoinServer(false);
            setError(false);
            setServerinput('');
            setJoinServerInput('');
        }else return
    }, [modalStatus]);

    useEffect(() => {
        setEditUserInput('');
        setUserImageURL(user.userPhoto? user.userPhoto : null)
        setUserImage(null);
    }, [editProfile])

    useEffect(() => {
        if(serverImage || editServerInput){
            setBtnSaveDsbl(false)
        }
        if(!serverImage && !editServerInput){
            setBtnSaveDsbl(!btnSaveDsbl)
        }
        
    }, [serverImage, editServerInput])

    useEffect(() => {
        if(userImage || editUserInput){
            setBtnSaveDsbl(false)
        }
        if(!userImage && !editUserInput){
            setBtnSaveDsbl(!btnSaveDsbl)
        }
        
    }, [userImage, editUserInput])

    useEffect(() =>{
        selectedServer && db.collection('server')
        .doc(selectedServer.serverID)
        .collection('serverMembers')
        .onSnapshot(snapshot =>{
            setMembers(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        });
        setServerImageURL(selectedServer?.serverPhoto);
    },[selectedServer])

    //Handlers

    const handleModal = () => {
        setModalStatus(!modalStatus);
    }

    const handleDrawer = (state) => {
        setDrawer(state)
    };

    const handleCreateServer = () =>{
        db.collection('server')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            serverName: serverInput?serverInput: 'none',
            serverPhoto: null,
            creatorUID: user.userUID,
            creatorName: user.username,
            members: [user.userUID]
        })
        .then(res => {
            console.log('Created Server Succesfully');
            res.collection('serverMembers')
            .add({
                userUID: user.userUID,
                username: user.username,
                userPhoto: user.userPhoto,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setModalStatus(!modalStatus);
            setServerinput('');
        })
    }

    const handleJoinServer = (id) => {
        db.collection('server')
        .doc(id)
        .update({
            members: firebase.firestore.FieldValue.arrayUnion(user.userUID)
        })
        .then(res =>{
            db.collection('server')
            .doc(id)
            .collection('serverMembers')
            .add({
                userUID: user.userUID,
                username: user.username,
                userPhoto: user.userPhoto,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(_res =>{
                setJoinServerInput('');
                setModalStatus(!modalStatus);
            });
        })
        .catch(err => setError(true));
    }

    const setMembersNull = () =>{
        setMembers([]);
    }

    const openJoinServerModal =() => {
        setJoinServer(true);
    }

    const openModal =() =>{
        setCreateChannelSt(!createChannelSt);
    }

    const openEditServer =() => {
        setEditServer(!editServer);
        setServerImageURL(selectedServer.serverPhoto? selectedServer.serverPhoto : ICON)
    }

    const openEditProfile = () => {
        setEditProfile(!editProfile);
    };

    const handleServerImageChanged = (e) => {
        setServerImageURL(URL.createObjectURL(e.target.files[0]));
        setServerImage(e.target.files[0]);
    }
    const handleUserImageChanged = (e) => {
        setUserImageURL(URL.createObjectURL(e.target.files[0]));
        setUserImage(e.target.files[0]);
    }

    const handleSubmitServerChanges = () => {
        if(serverImage){
            let inputServerName = selectedServer.serverName;
            if(editServerInput){
                inputServerName = editServerInput;
            }
            const uploadTask = storage.ref(`serverImages/${serverImage.name}`).put(serverImage);
            uploadTask.on(
                'state-changed',
                (snapshot) => {
                    let uploadProgress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgressValue(uploadProgress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref('serverImages')
                        .child(serverImage.name)
                        .getDownloadURL()
                        .then(url => {
                        db.collection('server')
                        .doc(selectedServer.serverID)
                        .update({
                            serverPhoto: url,
                            serverName: inputServerName
                        })
                        .then(res => {
                            setServerImageURL(selectedServer.serverPhoto);
                            setServerImage(null);
                            dispatch(setServer({
                                serverName: inputServerName,
                                serverID: selectedServer.serverID,
                                serverPhoto: url
                            }))
                            setProgressValue(0);
                            setEditServer(!editServer)
                        })
                    })
                }
            )
        }
        if(!serverImage && editServerInput){
            db.collection('server')
            .doc(selectedServer.serverID)
            .update({
                serverName: editServerInput? editServerInput : selectedServer.serverName
            })
            .then(res => {
                setServerImageURL(selectedServer.serverPhoto);
                setEditServer(!editServer)
                dispatch(setServer({
                    serverName: editServerInput,
                    serverID: selectedServer.serverID,
                    serverPhoto: selectedServer.serverPhoto
                }))
            })
        }
        
    }

    const handleSubmitUserChanges = () =>{
        if(userImage){
            const uploadTask = storage.ref(`profilePictures/${userImage.name}`).put(userImage)
            let inputUsername = editUserInput;
            if(!editUserInput){
                inputUsername = user.username;
            };
            uploadTask.on(
                'state-changed',
                (snapshot) => {
                    const uploadProgress = Math.round(
                        (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                    )
                    setProgressValue(uploadProgress);
                },
                (error) => {
                    console.log(error.message)
                },
                () => {
                    storage.ref('profilePictures')
                    .child(userImage.name)
                    .getDownloadURL()
                    .then(url => {
                        auth.onAuthStateChanged(userAuth =>{
                            userAuth.updateProfile({
                                displayName: inputUsername,
                                photoURL: url
                            })
                            .then(res => {
                                userServers.forEach(usSe => {
                                    db.collection('server')
                                    .doc(usSe.id)
                                    .collection('serverMembers')
                                    .where('userUID', '==', user.userUID)
                                    .get()
                                    .then(_res => {
                                        _res.docs.forEach(doc =>{
                                            if(doc.data().userUID === user.userUID){
                                                db.collection('server')
                                                .doc(usSe.id)
                                                .collection('serverMembers')
                                                .doc(doc.id)
                                                .update({
                                                    userPhoto: url,
                                                    username: inputUsername
                                                })
                                            }
                                        })
                                    })
                                })

                                userServers.forEach(usSe => {
                                    let serverRef = db.collection('server')
                                        .doc(usSe.id)
                                        .collection('textChannel');
                                    serverRef
                                    .get()
                                    .then(_res => {
                                        _res.docs.forEach(doc => {
                                            serverRef.doc(doc.id)
                                            .collection('messages')
                                            .get().then(__res =>{
                                                __res.docs.forEach(memberMes =>{
                                                    if(memberMes.data().userUID === user.userUID){
                                                        serverRef.doc(doc.id)
                                                        .collection('messages')
                                                        .doc(memberMes.id)
                                                        .update({
                                                            user: inputUsername,
                                                            userPhoto: url
                                                        })
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })

                                dispatch(login({
                                    userUID: user.userUID,
                                    userPhoto: url,
                                    username: inputUsername
                                }))
                                setProgressValue(0);
                                setEditProfile(!editProfile);
                            })
                        })
                    })
                }
            )
        };
        if(!userImage && editUserInput) {
            auth.onAuthStateChanged(userAuth =>{
                userAuth.updateProfile({
                    displayName: editUserInput
                })
                .then( res =>{
                    userServers.forEach(usSe => {
                        db.collection('server')
                        .doc(usSe.id)
                        .collection('serverMembers')
                        .where('userUID', '==', user.userUID)
                        .get()
                        .then(_res => {
                            _res.docs.forEach(doc =>{
                                if(doc.data().userUID === user.userUID){
                                    db.collection('server')
                                    .doc(usSe.id)
                                    .collection('serverMembers')
                                    .doc(doc.id)
                                    .update({
                                        username: editUserInput
                                    })
                                }
                            })
                        })
                    })

                    userServers.forEach(usSe => {
                        let serverRef = db.collection('server')
                            .doc(usSe.id)
                            .collection('textChannel');
                        serverRef
                        .get()
                        .then(_res => {
                            _res.docs.forEach(doc => {
                                serverRef.doc(doc.id)
                                .collection('messages')
                                .get().then(__res =>{
                                    __res.docs.forEach(memberMes =>{
                                        if(memberMes.data().userUID === user.userUID){
                                            serverRef.doc(doc.id)
                                            .collection('messages')
                                            .doc(memberMes.id)
                                            .update({
                                                user: editUserInput
                                            })
                                        }
                                    })
                                })
                            })
                        })
                    })

                    dispatch(login({
                        userUID: user.userUID,
                        userPhoto: user.userPhoto,
                        username: editUserInput
                    }))
                    setEditProfile(!editProfile);
                })
            })
        }
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
                isDrawer={drawer}
                uid={user?.userUID}
                userPhoto={user?.userPhoto}
                username={user?.username}
                handleModal={handleModal}
                openModal = {openModal}
                openEditServer={openEditServer}
                openEditProfile = {openEditProfile}
                userServers= {userServers}
                setMembersNull ={setMembersNull} />
            <AppBody handleDrawer = {handleDrawer}  />
            <Members members={members} />
            {/* MODAL TO CREATE A SERVER */}
            <Modal open={modalStatus} >
                {!joinServer?<div className="home__createServer">
                    <Avatar 
                    src='https://www.clipartmax.com/png/middle/307-3072095_discord-icon-by-rengatv-cool-server-icons-discord.png'
                    style={{height: '70px', width:'70px'}} />
                    <input 
                        type='text'
                        value={serverInput} 
                        placeholder='Server name' 
                        onChange={(e) => setServerinput(e.target.value)} />
                    <button onClick={handleCreateServer} >Create</button>
                    <hr />
                    <button onClick={openJoinServerModal}>Join a server</button>
                </div>
                : <div className='home__createServer'>
                    <h2>Server ID</h2>
                    <input 
                        value={joinServerInput}
                        onChange={(e) => setJoinServerInput(e.target.value)}
                        placeholder='Server ID'
                        type="text"/>
                    <button onClick={() =>handleJoinServer(joinServerInput)} >Join</button>
                    {error?<p>Server not found</p>: ''}
                </div>}
                
            </Modal>
            {/* MODAL TO CREATE A CHANNEL */}
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
            {/* MODAL EDIT SEVER */}
            <Modal open={editServer} >
                <div className="home__editServer">
                    <h2>Edit Server ({selectedServer?.serverName})</h2>
                    <div className='home__editServerAvatar'>   
                        <Avatar 
                        style={{height:'100px', width:'100px'}} 
                        src={serverImageURL? serverImageURL: ICON}
                        />
                        <label><input type='file' onChange={handleServerImageChanged} />Choose</label>
                        <LinearProgress 
                            value={progressValue}
                            variant='determinate' 
                            className='home__progressbar' />
                    </div>
                    <div className='home__editServerForm'>
                        <Tooltip 
                        placement='top'
                        title='Leave as blank if you dont want to change the server name' >
                            <input 
                                type='text'
                                value={editServerInput}
                                onChange={(e) => setEditServerInput(e.target.value)}
                                placeholder='Server Name' />
                        </Tooltip>
                        <button disabled={btnSaveDsbl} onClick={handleSubmitServerChanges} >Save</button>
                    </div>
                </div>
            </Modal>
            {/* MODAL EDIT PROFILE */}
            <Modal open={editProfile} >
                <div className="home__editServer">
                    <h2>Edit your Profile</h2>
                    <div className='home__editServerAvatar'>   
                        <Avatar 
                        style={{height:'100px', width:'100px'}} 
                        src={userImage? URL.createObjectURL(userImage): userImageURL }
                        />
                        <label><input type='file' onChange={handleUserImageChanged} />Choose</label>
                        <LinearProgress 
                            value={progressValue}
                            variant='determinate' 
                            className='home__progressbar' />
                    </div>
                    <div className='home__editServerForm'>
                        <Tooltip 
                        placement='top'
                        title='Leave as blank if you dont want to change your username' >
                            <input 
                                type='text'
                                value={editUserInput}
                                onChange={(e) => setEditUserInput(e.target.value)}
                                placeholder='Username' />
                        </Tooltip>
                        <button disabled={btnSaveDsbl} onClick={handleSubmitUserChanges} >Save</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Home;
