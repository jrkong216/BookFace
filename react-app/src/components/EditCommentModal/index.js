import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment';
import "./EditCommentModal.css"

function EditCommentModal({item, spotId}) {
  const [showModal, setShowModal] = useState(false);

const closeModal =()=> {setShowModal(false)}

return (
    <>
    <div className="modal-container">
      <button className="edit-button" onClick={() => setShowModal(true)}>Edit Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            {/* {console.log("did it get here? this is EditCommentModal")} */}
          <EditComment item={item} closeModal={closeModal}/>
        </Modal>
      )}
      </div>
    </>
  );
}

export default EditCommentModal;
