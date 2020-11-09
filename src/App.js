import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {auth, db} from './firebase';
import {login, logout, getUser, servers, getServers} from './reduxSlices/userSlice';
import './App.css';
import Credentials from './containers/Credentials/Credentials';
import Home from './containers/Home/Home';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const userServers = useSelector(getServers)

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        dispatch(login({
          userUID: authUser.uid,
          userPhoto: authUser.photoURL,
          username: authUser.displayName
        }));
      }
      else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  useEffect(() => {
    console.log('User changed');
    if(user){
      db.collection('server')
      .where('members', 'array-contains', user?.userUID)
      .onSnapshot(snapshot => {
        dispatch(servers(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        ))
      })
    }
    
  }, [user, dispatch])


  return (
    <div className="app">
      {user?<Home />
      :<Credentials />}
    </div>
  );
}

export default App;
