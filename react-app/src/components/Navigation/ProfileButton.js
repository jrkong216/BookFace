// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal'
import SignupForm from '../SignupFormModal/SignupForm'
import LoginForm from '../LoginFormModal/LoginForm'


import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then(()=>history.push("/"));
  };

  const mySpots = (e) => {
    e.preventDefault();
    history.push(`/current/user`);
  };

let loggedInOrNot;
if (user){
  loggedInOrNot =(
    <>
    <button className="actual-button" onClick={openMenu}>
        <div className="profile-button-container" id="pink">
      <span className="fa-solid fa-bars fa-2x" id="pink"></span>
      <span className="fa-solid fa-circle-user fa-2x" id="pink"></span>
      </div>
      </button>
      {showMenu && (
        <div className="dropdown-content">
          {/* <div className="username-container">
          <div>{user.username}</div>
          </div>
          <div className="username-container">
          <div>{user.email}</div>
          </div> */}
          <div>
          <div className="my-spots" onClick={mySpots}>Profile</div>
          </div>
          <div>
            <div className="log-out" onClick={logout}>Log Out</div>
          </div>
        </div>
      )}
    </>
  )
} else{
  loggedInOrNot = (
    <>
    <button className="actual-button" onClick={openMenu}>
        <div className="profile-button-container" id="pink">
      <span className="fa-solid fa-bars fa-2x"></span>
      <span className="fa-solid fa-circle-user fa-2x"></span>
      </div>
      </button>
      {showMenu && (
        <div className="dropdown-content">
        <div className="sign-up-text" onClick={() => setShowSignUpModal(true)}>Sign Up</div>
        <div className="log-in-text" onClick={() => setShowLogInModal(true)}>Log In</div>
        </div>
        )}
        {showSignUpModal && (
        <Modal onClose={() => setShowSignUpModal(false)}>
          <SignupForm />

        </Modal>
      )}
      {showLogInModal && (
        <Modal onClose={() => setShowLogInModal(false)}>

          <LoginForm />
        </Modal>
      )}

    </>
  )
}

  return (
    <>
      {loggedInOrNot}
    </>
  );
}

export default ProfileButton;
