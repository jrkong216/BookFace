import React, { useState, useEffect } from 'react';
import {Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import HomePage from "./components/HomePage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector((state) => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    })();
  }, [dispatch]);

  return (
    <>
    {sessionUser ? <Navigation isLoaded={isLoaded} />: null}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/homepage">
            <h1>SOON TO BE HOMEPAGE</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}
export default App;
