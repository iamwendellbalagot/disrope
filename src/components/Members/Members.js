import React from 'react';
import './Members.css';

import Avatar from '@material-ui/core/Avatar';

const Members = ({members}) => {
    return (
        <div className='members'>
            <div className="members__header">
                <h3>Members</h3>
            </div>
            <div className="members__container">
                {members?.map(member =>(
                    <div key={member.id}>
                        <Avatar 
                            src={member.data.userPhoto}
                        />
                        <span>{member.data.username? member.data.username: 'no username'}</span>
                    </div>
                ))}
               
            </div>
        </div>
    )
}

export default Members;
