//component/PostCard
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
// import {getAllReviews, CreateReview, DeleteReview} from '../../store/reviewsReducer'
// import OpenCommentModal from '../OpenCommentModal'
import { Modal } from '../../context/Modal';
// import DeleteButtonElip from "../DeleteButtonElip"
import {deletePost, loadAllPosts} from "../../store/posts"
import {loadAllComments, createNewComment, deleteComment} from "../../store/comments"
import EditPostForm from "../EditPostForm";
import "./PostCard.css"

function PostCard({ post }) {
const sessionUser = useSelector(state => state.session.user);
  // console.log("this is post", post);
  let postId = post.id
//   console.log("this is postId", postId)
  const dispatch = useDispatch()
//   const [review, setComment] = useState("");
//   const [stars, setStars] = useState(1)
  const [showModal, setShowModal] = useState(false);
  const closeModal =()=> {console.log("close modal clicked")
  setShowModal(false)}
  useEffect(() => {
    dispatch(loadAllComments())
}, [dispatch])

const commentInfo = useSelector(state => state.comments)
const commentInfoArray = Object.values(commentInfo)
// console.log("this is commentInfoArray", commentInfoArray)

const commentByPostId = commentInfoArray.filter(post => post && post.id === postId)

console.log("this is commentByPostId", commentByPostId)
// const closeModal =()=> {setShowModal(false)}
// if (!commentBySpotId) return null

  const postHandler = async (e) =>{
    e.preventDefault()
// console.log("is code running here")
    const payload = {
        // review,
        // stars
    }
// console.log("this is payload", payload)
    let createdComment;
try{
  createdComment = await dispatch(createNewComment(postId, payload)).then(()=>dispatch(loadAllComments()))
} catch(res) {
  const data = await res.json()
}

// setComment("")
  }

  const deleteCommentHandler = async (id, userId) => {
    if (sessionUser.id === userId){
        const payload = {
            postId: postId,
            commentId: id
        }
        let commentToDelete;
        commentToDelete = dispatch(deleteComment(payload)).then(()=>dispatch(loadAllComments()))
        closeModal()
    } else {
        alert("You do not have permission to Delete this review")
    }

  }

const deleteHandler = async (e) => {
  // e.preventDefault();

  const payload = {
    id: post.id
}

let postToDelete;
    postToDelete = await dispatch(deletePost(payload)).then(()=>dispatch(loadAllPosts()))
};

  return (
    <div className="spot-link-container">
      <div className="spot-container">
        <div className="top-spot-container">
          <div className="spot-card-profile-circle-container">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
          </div>
          <div className="UserName">
            {post.user.first_name} {post.user.last_name}
            {/* <DeleteButtonElip/> */}
          </div>
          <div className="Edit-container">
                           <button className="fas fa-edit fa-2x" aria-hidden="true" onClick={() => setShowModal(true)} ></button>
          </div>
          {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                    <EditPostForm post={post} closeModal={closeModal}/>
                    </Modal>
                    )}
          <div className="Delete-container">
                           {/* <button className="fa-solid fa-ellipsis" ></button> */}
                           <button className="fa fa-trash fa-2x" aria-hidden="true" onClick={() => deleteHandler()} ></button>
          </div>

        </div>

        <div>{post.description}</div>
        <div className="spot-image-container">
          <img className="spot-image" src={post.img_url} />
        </div>
        {/* {post.img_url === "0" ? null :
                <div className="spot-image-container">
          <img className="spot-image" src={post.img_url} />
        </div>} */}


        {/* <div className="font-awesome-container">
            <div className="heart-container">
            <i class="fa-regular fa-heart fa-lg"></i>
            </div>
            <OpenCommentModal post={post} commentByPostId={commentByPostId} deleteCommentHandler={deleteCommentHandler} postHandler={postHandler} /> */}
            {/* <div className="comment-container" >
            <i class="fa-regular fa-comment fa-lg"></i>
            </div> */}
        {/* </div> */}
        <div className="likes-container">
            <div className="likes">Likes go here</div>
        </div>

        <div className="userName-description-container">
            <div className="userName-container">
            {/* <div className="userName">{post.user.first_name} this needs to be userNAME</div> */}
            <div className="like-button">LIKE BUTTON GO HERE-----------</div>
            </div>
            <div className="Comment-Button">
            <div className="description-container">COMMENT BUTTON HERE</div>
            </div>
        </div>

<div className="new-comments-container">
{commentByPostId.map((item) => {
                        return (
                            <div className= "comment-box-container" key={item.id}>

                                <div className="spot-review-name"> { item.user && item.user.first_name}:</div>
                                <div className= "item-comment-container">
                                <div className="item-comment"> {item.description}</div>
                                </div>


                                <div className="modal-container">
                            <button className="fa-solid fa-ellipsis" onClick={() => setShowModal(true)}></button>
                                  {showModal && (
                                  <Modal onClose={() => setShowModal(false)}>
                                  {/* <DeleteButton item={item} postId={postId} sessionUser={sessionUser} closeModal={closeModal} /> */}
                                  </Modal>
                                      )}
                                  </div>

                                {/* <i class="fa-solid fa-ellipsis"></i> */}


                                <div className="comment-delete-button-container">
                                <button className="Comment-Delete-Button" onClick= {() => deleteCommentHandler(item.id, item.user_id)}>Delete Comment</button>
                                </div>
                            </div>

                        )})
                    }

</div>


      </div>
    </div>
  );
}

export default PostCard;
