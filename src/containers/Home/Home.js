import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../reduxSlices/userSlice';

import AppBody from '../../components/AppBody/AppBody';
import Members from '../../components/Members/Members';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Home.css';
const Home = () => {
    const user = useSelector(getUser);

    return (
        <div className='home'>
            <Sidebar 
                uid={user?.userUID}
                userPhoto={user?.userPhoto}
                username={user?.username} />
            <AppBody />
            <Members />
        </div>
    )
}

export default Home;
