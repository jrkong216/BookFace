
// import {getAllReviews, CreateReview, DeleteReview} from '../../store/reviewsReducer'
// import OpenCommentModal from '../OpenCommentModal'
import { useState } from 'react';
import { Modal } from '../../context/Modal';
// import { useSelector, useDispatch } from 'react-redux';
// import DeleteButton from './DeleteButton'
import "./CreateAPost.css";
import CreatePostForm from '../CreatePostForm';


function CreateAPost({sessionUser}) {
    const [showCreateModal, setCreateShowModal] = useState(false);





  return (
    <div className = "create-post-container">
        <div className = "create-left-container">
            <div className = "avatar container">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
            </div>
        </div>
        <div className = "create-right-container">
            <div className = "container-to-click" onClick={() => setCreateShowModal(true)}>
            {showCreateModal && (
                    <Modal onClose={() => setCreateShowModal(false)}>
                         {/* {console.log("did it get here? this is OPenCommentModal")} */}
                    <CreatePostForm />
                    </Modal>
                    )}
                <div className="click"> What's on your mind, {sessionUser.first_name}
                </div>
            </div>
        </div>
    </div>

  );
}

export default CreateAPost;
