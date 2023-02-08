import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import OpenComment from './OpenComment';
import "./OpenCommentModal.css"

function OpenCommentModal({post, commentByPostId, sessionUser, closeModal}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="modal-container">
      {post.img_url === "" ? null: <button className="fa-regular fa-message" onClick={() => setShowModal(true)}> COMMENT</button> }
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            {console.log("did it get here? this is OPenCommentModal")}
          <OpenComment post={post} commentByPostId={commentByPostId} sessionUser={sessionUser} closeModal={closeModal}/>
        </Modal>
      )}
      </div>
    </>
  );
}

export default OpenCommentModal;
