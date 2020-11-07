import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './ServerIcons.css';

const ServerIcons = ({handleServerChange, name, id}) => {
    return (
        <div className='serverIcons'>
            <Avatar 
                className='serverIcons__icon' 
                onClick={() =>handleServerChange(name, id)} />
        </div>
    )
}

export default ServerIcons
