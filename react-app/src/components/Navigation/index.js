// frontend/src/components/Navigation/index.js
import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import bookfacelogo from "../HomePage/Images/bookfacelogo.png"


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div className= "profile-button">
      <ProfileButton user={sessionUser}/>
      </div>
      </>

    );
  }

  return (
    <div className="navbar-main">
      <div className="navbar-inner-container">
    <div className= "Home-Container">
        <NavLink exact to="/"><img className='logo' src={bookfacelogo} alt="bookfacelogo"/></NavLink>
    </div>

    <div className="Right-Side-Container">
      {isLoaded && sessionLinks}
    </div>
    </div>
    </div>

  );
}

export default Navigation;
