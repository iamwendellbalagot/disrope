import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './ServerIcons.css';

const ICON = 'https://www.clipartmax.com/png/middle/307-3072095_discord-icon-by-rengatv-cool-server-icons-discord.png'

const ServerIcons = ({handleServerChange, name, id, serverPhoto}) => {
    return (
        <div className='serverIcons'>
            <Avatar 
                className='serverIcons__icon' 
                src={serverPhoto? serverPhoto : ICON}
                onClick={() =>handleServerChange(name, id, serverPhoto)} />
        </div>
    )
}

export default ServerIcons
