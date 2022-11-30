import React, { useState, useEffect } from 'react';
import {Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import HomePage from "./components/HomePage";
import Posts from "./components/Posts";
import ProfilePage from "./components/ProfilePage";
import CreateAPost from './components/CreateAPost';
import Footer from "./Footer"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // if(!sessionUser){
  //   return null
  // }
  // console.log("this is sessionUser", sessionUser)
  return (
    <>
    {sessionUser ? <Navigation isLoaded={isLoaded} />: null}
      {isLoaded && (
        <>
        <div>
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/homepage">
            <Posts/>
          </Route>
          <Route path="/current/user">
            <ProfilePage/>
          </Route>
          <Route path="/test">
            <CreateAPost/>
          </Route>
        </Switch>

        </div>

        <Footer/>
        </>
      )}
</>

  );
}
export default App;
