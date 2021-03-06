import React, {useState, useEffect} from 'react';
import FlipMove from 'react-flip-move';
import './AppBody.css';

import firebase from 'firebase';
import {db} from '../../firebase';

import {useDispatch, useSelector} from 'react-redux';
import {getChannel, getServer} from '../../reduxSlices/appSlice';
import {getUser} from '../../reduxSlices/userSlice';

import Input from '../SubComponents/Input/Input';

import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Message from '../SubComponents/Message/Message';

const AppBody = ({handleDrawer}) => {
    const [messages, setMessages] = useState([]);
    const user = useSelector(getUser);
    const selectedChannel = useSelector(getChannel);
    const selectedServer = useSelector(getServer);
    const [drawer, setDrawer] = useState(false);

    useEffect(() => {
        if(selectedChannel && selectedChannel.channelID){
            db.collection('server')
            .doc(selectedServer?.serverID)
            .collection('textChannel')
            .doc(selectedChannel?.channelID)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc =>({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
    }, [selectedChannel])

    useEffect(() =>{
        setMessages([]);
    },[selectedServer]);

    return (
        <div className='appbody'>
            {!drawer?<ArrowRightIcon onClick={() => {setDrawer(true); handleDrawer(true)}} />
            : <ArrowLeftIcon onClick={() => {setDrawer(false); handleDrawer(false)}} />}
            <div className="appbody__header">
                <div className="appbody__headerChannel">
                    <span>#</span>
                    <h3>{selectedChannel?.channelName}</h3>
                </div>
                <div className="appbody__headerIcons">
                    <NotificationsIcon />
                    <PeopleAltIcon />
                </div>
            </div>
            <div className="appbody__chat">
                <FlipMove>
                    {messages?.map(message => (
                        <Message
                            key={message.id}
                            message={message.data.message}
                            username={message.data.user} 
                            userPhoto={message.data.userPhoto}
                            dateSent = {message.data.timestamp}
                            isUser = {message.data.userUID === user.userUID}
                            messageType={message.data.type}
                            />        
                    ))}
                </FlipMove>
            </div>
            <Input />
        </div>
    )
};

export default AppBody
