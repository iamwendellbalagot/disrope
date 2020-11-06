import React from 'react';
import AppBody from '../../components/AppBody/AppBody';
import Members from '../../components/Members/Members';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Home.css';
const Home = () => {
    return (
        <div className='home'>
            <Sidebar />
            <AppBody />
            <Members />
        </div>
    )
}

export default Home;
