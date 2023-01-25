import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import OpenComment from './OpenComment';
import "./OpenCommentModal.css"

function OpenCommentModal({post, commentByPostId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="modal-container">
      <div className="fa-regular fa-comment fa-lg" onClick={() => setShowModal(true)}></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            {console.log("did it get here? this is OPenCommentModal")}
          <OpenComment post={post} commentByPostId={commentByPostId}/>
        </Modal>
      )}
      </div>
    </>
  );
}

export default OpenCommentModal;
