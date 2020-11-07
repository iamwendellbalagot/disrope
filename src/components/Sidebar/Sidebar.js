import React from 'react';
import {logout} from '../../reduxSlices/userSlice';
import {useDispatch} from 'react-redux';
import {auth} from '../../firebase';
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

    const signOutUser = () =>{
        auth.signOut();
        dispatch(logout())
    }
    return (
        <div className='sidebar'>
            <div className="sidebar__server">
                <AddBoxIcon />
                <ServerIcons />
            </div>
            <div className='sidebar__container'>
                <div className="sidebar__channel">
                    <div className="sidebar__header">
                        <h3>Server</h3>
                    </div>
                    <div className="channel__container">
                        <div className='channel__containerHeader'>
                            <div>
                                <ExpandMoreIcon />
                                <h5>Text Channels</h5>
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