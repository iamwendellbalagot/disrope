import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {auth, db} from './firebase';
import {login, logout, getUser, servers, getServers} from './reduxSlices/userSlice';
import './App.css';
import Credentials from './containers/Credentials/Credentials';
import Home from './containers/Home/Home';
import Register from './containers/Credentials/Register';

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
      <Switch>
        <Route exact path='/' >
          {user? <Home /> : <Redirect to='/login' />}  
        </Route>
        <Route path='/register'  >
          {!user? <Register /> : <Redirect to='/' />}
        </Route>
        <Route to='/login'  >
          {!user? <Credentials/> : <Redirect to='/' /> }
        </Route>
      </Switch>
    </div>
  );
}

export default App;
