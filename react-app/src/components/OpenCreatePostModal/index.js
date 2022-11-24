
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePost from './CreatePost';
// import "./CreatePost.css"

function OpenCreatePostModal() {
  const [showModal, setShowModal] = useState(false);

return (
    <>
    <div className="Signup-Container">
      <button className="sign-up-text" onClick={() => setShowModal(true)}>CreatePost</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePost />
        </Modal>
      )}
      </div>
    </>
  );
}

export default OpenCreatePostModal;
