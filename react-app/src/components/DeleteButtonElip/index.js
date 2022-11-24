// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal'
import './DeleteButtonElip.css'

function DeleteButtonElip({user}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  const deletePost = (e) => {
    e.preventDefault();
    // console.log("made it to profilebutton logout handler")
    dispatch(sessionActions.logout())
    history.push("/");
  };

  return (
    <>
        <button className="fa-solid fa-ellipsis"onClick={openMenu}></button>
        {showMenu && (
          <div className="dropdown-content">
            <div>
              <div className="log-out" onClick={deletePost}>Delete Post</div>
            </div>
          </div>
        )}
      </>
  );
}

export default DeleteButtonElip;
