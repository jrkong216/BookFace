import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment';
import "./EditCommentModal.css"

function EditCommentModal({item, sessionUser}) {
  const [showModal, setShowModal] = useState(false);

const closeModal =()=> {setShowModal(false)}

return (
    <>
    <div className="edit-modal-container">
    {sessionUser && sessionUser.id === item.user_id ?<button className="fas fa-edit" id="trashcan" onClick={() => setShowModal(true)}></button>:null}
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
