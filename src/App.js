import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {auth} from './firebase';
import {login, logout, getUser} from './reduxSlices/userSlice';
import './App.css';
import Credentials from './containers/Credentials/Credentials';
import Home from './containers/Home/Home';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

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
    console.log(user);
  }, [user])

  return (
    <div className="app">
      {user?<Home />
      :<Credentials />}
    </div>
  );
}

export default App;
