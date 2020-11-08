import React, {useState, useEffect} from 'react';
import './AppBody.css';

import firebase from 'firebase';
import {db} from '../../firebase';

import {useDispatch, useSelector} from 'react-redux';
import {getChannel, getServer} from '../../reduxSlices/appSlice';

import Input from '../SubComponents/Input/Input';

import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Message from '../SubComponents/Message/Message';

const AppBody = () => {
    const [messages, setMessages] = useState([]);
    const selectedChannel = useSelector(getChannel);
    const selectedServer = useSelector(getServer);

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
    return (
        <div className='appbody'>
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
                {messages?.map(message => (
                    <Message
                        key={message.id}
                        message={message.data.message}
                        username={message.data.user} 
                        dateSent = {message.data.timestamp}
                        />
                ))}
            </div>
            <Input />
        </div>
    )
}

export default AppBody
