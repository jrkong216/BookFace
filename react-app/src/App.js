import React, { useState, useEffect } from 'react';
import {Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import HomePage from "./components/HomePage";
import Posts from "./components/Posts";
import ProfilePage from "./components/ProfilePage";
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

     <footer className="footer">
      <div className="footer-about">
      <strong>BookFace -  Inspired by FaceBook</strong>
     </div>
      <div className="footer-links">
       <div>
         <a id="github" className="links-github" href="https://github.com/jrkong216">Created By: Jason Kong &nbsp;
          <i className="fa-brands fa-github fa-xl"></i>
        </a>
         <a id="linkedin" className="links-linkedin" href="https://www.linkedin.com/in/jason-kong-39552922/">
        <i className="fa-brands fa-linkedin fa-xl"></i>
      </a>
     </div>
    </div>
    </footer>
</div>
      )}
</>
  );
}
export default App;
