
// import {getAllReviews, CreateReview, DeleteReview} from '../../store/reviewsReducer'
// import OpenCommentModal from '../OpenCommentModal'
import { useState} from 'react';
import { Modal } from '../../context/Modal';
// import { useSelector, useDispatch } from 'react-redux';
// import DeleteButton from './DeleteButton'
import "./CreateAGroup.css";
import CreateGroupForm from '../CreateGroupForm';
// import OpenCreatePostModal from '../OpenCreatePostModal';


function CreateAGroup({sessionUser}) {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const closeModal =()=>
    {console.log("close modal clicked")
    setShowCreateModal(false)}


  return (
    <div className = "create-post-container">
        <div className = "create-right-container">
            <div className = "container-to-click">
            {showCreateModal && (
                    <Modal onClose={() => setShowCreateModal(false)}>
                    <CreateGroupForm setShowCreateModal={setShowCreateModal} closeModal={closeModal} sessionUser={sessionUser}/>
                    </Modal>
                    )}
                <div className="click" onClick={() => setShowCreateModal(true)}> Create A Group
                </div>
            </div>
        </div>
    </div>

  );
}

export default CreateAGroup;
