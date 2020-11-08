import React, {useEffect, useState} from 'react';
import {logout} from '../../reduxSlices/userSlice';
import {setServer, setChannel} from '../../reduxSlices/appSlice';
import {getServer} from '../../reduxSlices/appSlice';
import {useDispatch, useSelector} from 'react-redux';
import {auth, db} from '../../firebase';
import './Sidebar.css';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import Avatar from '@material-ui/core/Avatar';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ServerIcons from '../SubComponents/ServerIcons/ServerIcons';

const Sidebar = (props) => {
    const dispatch = useDispatch()
    const [channels, setChannels] = useState([]);
    const selectedServer = useSelector(getServer);
    

    const signOutUser = () =>{
        auth.signOut();
        dispatch(logout())
        window.location.reload()
    }

    const handleServerChange =(name, id) =>{
        dispatch(setServer({
            serverName: name,
            serverID: id
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

    const handleChannelChange = (name, id) => {
        dispatch(setChannel({
            channelName: name,
            channelID: id
        }))
        console.log(name, id);
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__server">
                <AddBoxIcon onClick={props.handleModal} />
                {props.userServers?.map(server => (
                    <ServerIcons 
                        key={server.id}
                        name={server.data.serverName}
                        id={server.id} 
                        handleServerChange={handleServerChange} />
                ))}
            </div>
            <div className='sidebar__container'>
                <div className="sidebar__channel">
                    <div className="sidebar__header">
                        <h3>{selectedServer?.serverName}</h3>
                    </div>
                    <div className="channel__container">
                        <div className='channel__containerHeader'>
                            <div>
                                <ExpandMoreIcon />
                                <h5>Text Channels</h5>
                            </div>
                            <AddIcon
                                onClick={() => props.openModal()}
                             />
                        </div>
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
                    <div className="channel__container">
                        <div className='channel__containerHeader'>
                            <div>
                                <ExpandMoreIcon />
                                <h5>Voice Channels</h5>
                            </div>
                            <AddIcon />
                        </div>
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
                        <Avatar
                            onClick={signOutUser} 
                            src={props.userPhoto}
                        />
                        <div>
                            <p>{props.username? props.username.slice(0,7): 'username'}</p>
                            <span>{props.uid.slice(0,5)}</span>
                        </div>
                    </div>
                    <div className="sidebar__userIcons">
                        <MicIcon />
                        <HeadsetIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;