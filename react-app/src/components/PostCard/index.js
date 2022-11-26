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
  const [description, setComment] = useState("");
//   const [stars, setStars] = useState(1)
  const [showModal, setShowModal] = useState(false);
  const [showEditCommentModal, setEditCommentShowModal] = useState(false);
  const closeModal =()=> {console.log("close modal clicked")
  setShowModal(false)}
  useEffect(() => {
    dispatch(loadAllComments())
}, [dispatch])

const commentInfo = useSelector(state => state.comments)
const commentInfoArray = Object.values(commentInfo)
console.log("this is commentInfoArray", commentInfoArray)

const commentByPostId = commentInfoArray.filter(comment => comment && comment.post_id === postId)

console.log("this is commentByPostId", commentByPostId)
// const closeModal =()=> {setShowModal(false)}
// if (!commentBySpotId) return null

  const postHandler = async (e) =>{
    e.preventDefault()
// console.log("is code running here")
    const payload = {
        description
    }
console.log("this is payload", payload)
    let createdComment;

  createdComment = await dispatch(createNewComment(postId, payload)).then(()=>dispatch(loadAllComments()))

setComment("")
  }

  const deleteCommentHandler = async (id) => {
    console.log("this is id", id)

        const payload = {
            id: id
        }

        let commentToDelete;
        commentToDelete = await dispatch(deleteComment(payload)).then(()=>dispatch(loadAllComments()))
        closeModal()


  }

const deletePostHandler = async (e) => {
  // e.preventDefault();

  const payload = {
    id: post.id
}

let postToDelete;
    postToDelete = await dispatch(deletePost(payload)).then(()=>dispatch(loadAllComments()))
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
                           <button className="fa fa-trash fa-2x" aria-hidden="true" onClick={() => deletePostHandler()} ></button>
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

        <div className="likecomment-description-container">
            <div className="Like-container">
            {/* <div className="userName">{post.user.first_name} this needs to be userNAME</div> */}
            <div className="fa-solid fa-thumbs-up"> LIKE</div>
            </div>
            <div className="Comment-Container">
            <div className="fa-regular fa-message"> COMMENT</div>
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
                            <button className="comment-edit-button" onClick={() => setEditCommentShowModal(true)}>EDIT Comment</button>
                                  {showEditCommentModal && (
                                  <Modal onClose={() => setEditCommentShowModal(false)}>
                                  {/* <DeleteButton item={item} postId={postId} sessionUser={sessionUser} closeModal={closeModal} /> */}
                                  </Modal>
                                      )}
                                  </div>

                                {/* <i class="fa-solid fa-ellipsis"></i> */}


                                <div className="comment-delete-button-container">
                                <button className="Comment-Delete-Button" onClick= {() => deleteCommentHandler(item.id, item.user_id)}>Delete Comment</button>
                                {/* {console.log("this is item.id, item.user_id", item.id, item.user_id)} */}
                                </div>
                            </div>

                        )})
                    }

</div>
<div className="make-a-comment-container">
            <div className="emoji-container">
            <i class="fa-regular fa-face-smile fa-lg"></i>
            </div>
            <div className="actual-comment-container">
            <form className="form-post-container" onSubmit={postHandler}>
            <label>
                <input
                    className="spot-card-form-inputs"
                    type="text"
                    value={description}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="Comment Here"
                />
            </label>
            {/* <div className="post-button-container">
                <button className="post-text" type="submit">Post</button>
            </div> */}
            </form>
            </div>
        </div>

      </div>
    </div>
  );
}

export default PostCard;
