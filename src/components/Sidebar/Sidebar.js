import React from 'react';
import './Sidebar.css';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import Avatar from '@material-ui/core/Avatar';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar__server">

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
                            src='https://pbs.twimg.com/profile_images/1215688870672515072/ry9ZejZF_400x400.jpg'
                        />
                        <div>
                            <p>Wendell</p>
                            <span>#ahsdu76</span>
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