import React, {useEffect, useState, useRef} from 'react';
import {logout} from '../../reduxSlices/userSlice';
import {setServer, setChannel} from '../../reduxSlices/appSlice';
import {getServer, getChannel} from '../../reduxSlices/appSlice';
import {useDispatch, useSelector} from 'react-redux';
import firebase from 'firebase';
import {auth, db} from '../../firebase';
import './Sidebar.css';

import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import MicIcon from '@material-ui/icons/Mic';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ServerIcons from '../SubComponents/ServerIcons/ServerIcons';

const Sidebar = (props) => {
    const serverRef = useRef(null);
    const dispatch = useDispatch()
    const [channels, setChannels] = useState([]);
    const [menu, setMenu] = useState(null);
    const selectedServer = useSelector(getServer);
    const selectedChannel = useSelector(getChannel);
    

    const signOutUser = () =>{
        auth.signOut()
        .then(res => {
            dispatch(logout())
            window.location.reload()
        })
        
    }

    const menuOpen = (event) =>{
        setMenu(event.currentTarget)
    }

    const menuClose = () =>{
        setMenu(null);
    }

    const copyServerID = () => {
        navigator.clipboard.writeText(selectedServer.serverID)
        setMenu(null);
    }

    const handleServerChange =(name, id, serverPhoto) =>{
        dispatch(setServer({
            serverName: name,
            serverID: id,
            serverPhoto: serverPhoto
        }))
        db.collection('server')
        .doc(id)
        .collection('textChannel')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        dispatch(setChannel(null))
    }

    const handleLeaveServer = () =>{
        console.log('Leaving the server')
        const membersRef = db.collection('server')
            .doc(selectedServer.serverID)
            .collection('serverMembers');
        membersRef
        .where('userUID', '==', props.uid)
        .get()
        .then(res => {
            res.docs.forEach(doc =>{
                membersRef.doc(doc.id).delete()
                .then(_res => console.log('User removed'));
                db.collection('server')
                .doc(selectedServer.serverID)
                .update({
                    members: firebase.firestore.FieldValue.arrayRemove(props.uid)
                })
                .then(__res =>{
                    setMenu(null);
                    setChannels([]);
                    dispatch(setServer(null));
                    dispatch(setChannel(null));
                    props.setMembersNull();
                })
            })
        })
    }

    const handleChannelChange = (name, id) => {
        dispatch(setChannel({
            channelName: name,
            channelID: id
        }))
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__server">
                <Tooltip title='Add Server' placement='right' >
                    <AddBoxIcon onClick={props.handleModal} />
                </Tooltip>
                {props.userServers?.map(server => (
                    <ServerIcons 
                        key={server.id}
                        name={server.data.serverName}
                        id={server.id}
                        serverPhoto = {server.data.serverPhoto} 
                        handleServerChange={handleServerChange} />
                ))}
            </div>
            <div className='sidebar__container'>
                <div className="sidebar__channel">
                    <div className="sidebar__header">
                        <h3>{selectedServer?.serverName}</h3>
                        {/* <ExpandMoreIcon onClick={menuOpen} aria-controls='server-menu' aria-haspopup='true' /> */}
                        <div >
                            {selectedServer?<ExpandMoreIcon aria-controls="simple-menu" aria-haspopup="true" onClick={menuOpen} />: null}
                            <Menu
                            id="simple-menu"
                            anchorEl={menu}
                            keepMounted
                            open={Boolean(menu)}
                            onClose={menuClose}>
                                <MenuItem style={{color:'gray', fontSize:'15px',}} 
                                    onClick={copyServerID}>Copy Server ID</MenuItem>
                                <MenuItem style={{color:'gray', fontSize:'15px'}} 
                                    onClick={() => props.openEditServer()}>Edit Server</MenuItem>
                                <MenuItem style={{opacity:'0.7',color:'salmon', fontSize:'15px'}} 
                                    onClick={handleLeaveServer}>Leave Server</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div className='channel__containerHeader'>
                            <div>
                                <h5>Text Channels</h5>
                            </div>
                            <Tooltip title='Add Channel' placement='bottom-end' >
                                <AddIcon
                                    onClick={() => selectedServer && props.openModal()}
                                />
                            </Tooltip>
                            
                    </div>
                    <div className="channel__container">
                        {channels? channels.map(ch => (
                            <div 
                            key={ch.id} 
                            className="channel__containerChannels"
                            onClick={() => handleChannelChange(ch.data.channelName, ch.id)}>
                                <span>#</span>
                                <h5>{ch.data.channelName}</h5>
                            </div>
                        )) : ''}
                    </div>
                    <div className='channel__containerHeader'>
                            <div>
                                <h5>Voice Channels</h5>
                            </div>
                            <AddIcon />
                    </div>
                    <div className="channel__container">
                        <div className="channel__containerChannels">
                            <span>#</span>
                            <h5>general</h5>
                        </div>
                        <div className="channel__containerChannels">
                            <span>#</span>
                            <h5>gaming</h5>
                        </div>
                    </div>
                </div>
                <div className="sidebar__user">
                    <div className="sidebar__userProfile">
                        <Tooltip title='Edit Profile' >
                            <Avatar
                                style={{cursor: 'pointer'}}
                                src={props.userPhoto}
                                onClick={() => props.openEditProfile()}
                            />
                        </Tooltip>
                        <div>
                            <p>{props.username? props.username.slice(0,7): 'username'}</p>
                            <span>{props.uid.slice(0,5)}</span>
                        </div>
                    </div>
                    <div className="sidebar__userIcons">
                        <MicIcon />
                        <Tooltip title='Logout' >
                            <ExitToAppIcon
                                onClick={signOutUser} 
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;