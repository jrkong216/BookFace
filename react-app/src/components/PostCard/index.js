import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
// import {getAllReviews, CreateReview, DeleteReview} from '../../store/reviewsReducer'
// import OpenCommentModal from '../OpenCommentModal'
import { Modal } from '../../context/Modal';
// import DeleteButton from './DeleteButton'
import "./PostCard.css";

function PostCard({ post }) {
const sessionUser = useSelector(state => state.session.user);
//   console.log("this is post", post);
  let postId = post.id
//   console.log("this is postId", postId)
  const dispatch = useDispatch()
//   const [review, setComment] = useState("");
//   const [stars, setStars] = useState(1)
  const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     dispatch(getAllComments(postId))
// }, [dispatch])

// const commentInfo = useSelector(state => state.comments)
// const commentInfoArray = Object.values(commentInfo)

// const commentByPostId = commentInfoArray.filter(post => post && post.postId === postId)
// const closeModal =()=> {setShowModal(false)}
// if (!commentBySpotId) return null

  const postHandler = async (e) =>{
//     e.preventDefault()
// console.log("is code running here")
//     const payload = {
//         // review,
//         // stars
//     }
// console.log("this is payload", payload)
//     let createdComment;
// try{
//   createdComment = await dispatch(CreateComment(postId, payload)).then(()=>dispatch(getAllComments(postId)))
// } catch(res) {
//   const data = await res.json()
// }

// setComment("")
  }

//   const deleteCommentHandler = async (id, userId) => {
//     if (sessionUser.id === userId){
//         const payload = {
//             postId: postId,
//             commentId: id
//         }
//         let commentToDelete;
//         commentToDelete = dispatch(DeleteComment(payload)).then(()=>dispatch(getAllcomments(postId)))
//         closeModal()
//     } else {
//         alert("You do not have permission to Delete this review")
//     }

//   }

  return (
    <div className="spot-link-container" to={`/posts/${post.id}`}>
      <div className="spot-container">
        <div className="top-spot-container">
          <div className="spot-card-profile-circle-container">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
          </div>
          <div className="UserName">
            {post.user.first_name} {post.user.last_name}
          </div>
        </div>
        <div>{post.description}</div>
        <div className="spot-image-container">
          <img className="spot-image" src={post.img_url} />
        </div>

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
            <div className="userName">this needs to be first name last name</div>
            </div>
            <div className="userDescription-container">
            <div className="description-container">{post.description}</div>
            </div>
        </div>

{/* <div className="new-comments-container">
{commentByPostId.map((item) => {
                        return (
                            <div className= "comment-box-container" key={item.id}>

                                <div className="spot-review-name"> { item.User && item.User.firstName}:</div>
                                <div className= "item-comment-container">
                                <div className="item-comment"> {item.review}</div>
                                </div>


                                <div className="modal-container">
                            <button className="fa-solid fa-ellipsis" onClick={() => setShowModal(true)}></button>
                                  {showModal && (
                                  <Modal onClose={() => setShowModal(false)}>
                                  <DeleteButton item={item} spotId={spotId} sessionUser={sessionUser} closeModal={closeModal} />
                                  </Modal>
                                      )}
                                  </div> */}

                                {/* <i class="fa-solid fa-ellipsis"></i>


                                <div className="comment-delete-button-container">
                                <button className="Comment-Delete-Button" onClick= {() => deleteCommentHandler(item.id, item.userId)}>Delete Comment</button>
                                </div> */}
                            </div>

                        {/* )})
                    }

</div> */}

        {/* <div className="make-a-comment-container">
            <div className="emoji-container">
            <i class="fa-regular fa-face-smile fa-lg"></i>
            </div>
            <div className="actual-comment-container">
            <form className="form-post-container" onSubmit={postHandler}>
            <label>
                <input
                    className="spot-card-form-inputs"
                    type="text"
                    value={review}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="Comment Here"
                />
            </label>
            <div className="post-button-container">
                <button className="post-text" type="submit">Post</button>
            </div>
            </form>
            </div> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  );
}

export default PostCard;
