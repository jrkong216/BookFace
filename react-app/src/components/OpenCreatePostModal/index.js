
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePost from './CreatePost';
// import "./CreatePost.css"

function OpenCreatePostModal() {
  const [showModal, setShowModal] = useState(false);

return (
    <>
    <div className="CreatePost-Container">
      <button className="create-post-text" onClick={() => setShowModal(true)}>CreatePost</button>
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
