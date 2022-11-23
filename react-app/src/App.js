import React, { useState, useEffect } from 'react';
import {Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import HomePage from "./components/HomePage";
import Posts from "./components/Posts";
import CreateAPost from './components/CreateAPost';

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
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/homepage">
            <Posts/>
          </Route>
          <Route path="/test">
            <CreateAPost/>
          </Route>

        </Switch>
      )}
    </>
  );
}
export default App;
