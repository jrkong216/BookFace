
// import {getAllReviews, CreateReview, DeleteReview} from '../../store/reviewsReducer'
// import OpenCommentModal from '../OpenCommentModal'
import { useState, useEffect} from 'react';
import { Modal } from '../../context/Modal';
// import { useSelector, useDispatch } from 'react-redux';
// import DeleteButton from './DeleteButton'
import "./CreateAPost.css";
import CreatePostForm from '../CreatePostForm';
// import OpenCreatePostModal from '../OpenCreatePostModal';


function CreateAPost({sessionUser}) {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const closeModal =()=> {console.log("close modal clicked")
    setShowCreateModal(false)}
    // console.log("this is showCreateModal", showCreateModal)

    // useEffect(() => {
    //     if (!showCreateModal) return;

    //     const closeMenu = () => {
    //         setShowCreateModal(false);
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    //   }, [showCreateModal]);

  return (
    <div className = "create-post-container">
        <div className = "create-left-container">
            <div className = "avatar container">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
            </div>
        </div>
        <div className = "create-right-container">
            <div className = "container-to-click">
            {showCreateModal && (
                    <Modal onClose={() => setShowCreateModal(false)}>
                    <CreatePostForm setShowCreateModal={setShowCreateModal} closeModal={closeModal}/>
                    </Modal>
                    )}

                <div className="click" onClick={() => setShowCreateModal(true)}> What's on your mind, {sessionUser && sessionUser.first_name}
                </div>
            </div>
        </div>
    </div>

  );
}

export default CreateAPost;
