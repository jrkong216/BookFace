//component/PostCard
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
// import {getAllReviews, CreateReview, DeleteReview} from '../../store/reviewsReducer'
// import OpenCommentModal from '../OpenCommentModal'
import { Modal } from '../../context/Modal';
// import DeleteButtonElip from "../DeleteButtonElip"
import {deletePost} from "../../store/posts"
import {loadAllComments, createNewComment, deleteComment, clearAllComments} from "../../store/comments"
import EditPostForm from "../EditPostForm";
import EditCommentModal from "../EditCommentModal"

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
  // const [showEditCommentModal, setEditCommentShowModal] = useState(false);
  const [likes, setLikes] =useState("")
  const closeModal =()=> {console.log("close modal clicked")
  setShowModal(false)}
  useEffect(() => {
    dispatch(loadAllComments())
    setLikes(post && post.likes)
}, [dispatch, likes])

const commentInfo = useSelector(state => state.comments)
const commentInfoArray = Object.values(commentInfo)
// console.log("this is commentInfoArray", commentInfoArray)

const commentByPostId = commentInfoArray.filter(comment => comment && comment.post_id === postId)

// console.log("this is commentByPostId", commentByPostId)
// const closeModal =()=> {setShowModal(false)}
// if (!commentBySpotId) return null

  const postHandler = async (e) =>{
    e.preventDefault()
// console.log("is code running here")
    const payload = {
        description
    }
// console.log("this is payload", payload)
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
let clear
    clear = await dispatch(clearAllComments())

let postToDelete;
    postToDelete = await dispatch(deletePost(payload)).then(()=>dispatch(loadAllComments()))
};

const likeHandler = async (e) => {

console.log("this is post.likes", post.likes)

}


  return (

      <div className="spot-container">
        <div className="top-spot-container">
          <div className="spot-card-profile-circle-container">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
          </div>
          <div className="UserName">
            {post.users && post.users.first_name} {post.users && post.users.last_name}

          </div>
          <div className="Edit-container">
                           {/* <button className="fas fa-edit fa-2x" aria-hidden="true" onClick={() => setShowModal(true)} ></button> */}
                           {sessionUser && sessionUser.id === post.user_id ? <button className="fas fa-edit fa-2x" aria-hidden="true" onClick={() => setShowModal(true)} ></button>: null}
          </div>
          {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                    <EditPostForm post={post} closeModal={closeModal}/>
                    </Modal>
                    )}
          <div className="Delete-container">
          {sessionUser && sessionUser.id === post.user_id ? <button className="fa fa-trash fa-2x" aria-hidden="true" onClick={() => deletePostHandler()} ></button>: null}
          </div>

        </div>

        <div className="description">{post.description}</div>
        {post.img_url === ""? null :<div className="spot-image-container">
          <img className="spot-image" src={post.img_url} />
        </div>}
        {/* {post.img_url === "0" ? null :
                <div className="spot-image-container">
          <img className="spot-image" src={post.img_url} />
        </div>} */}

        {/* <div className="likes-container">
            <div className="likes">Likes: {post.likes}</div>
        </div> */}

        {/* <div className="likecomment-description-container">
            <div className="Like-container">
            <button className="fa-solid fa-thumbs-up" onClick={likeHandler}> LIKE</button>
            </div>
            <div className="Comment-Container">
            <button className="fa-regular fa-message"> COMMENT</button>
            </div>
        </div> */}

<div className="new-comments-container">
{commentByPostId.map((item) => {
                        return (
                            <div className= "comment-box-container" key={item.id}>
                              <div className="avatar-comment-circle-container">
                                    <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                              </div>
                                <div className="spot-review-name"> { item.users && item.users.first_name} { item.users && item.users.last_name}:

                                <div className="item-comment"> {item.description}</div>
                                </div>

                                  <EditCommentModal item={item} closeModal={closeModal} sessionUser={sessionUser} />

                                <div className="comment-delete-button-container">
                                {sessionUser && sessionUser.id === item.user_id ?<button className="fa fa-trash" onClick= {() => deleteCommentHandler(item.id, item.user_id)}></button>:null }

                                </div>
                            </div>

                        )})
                    }

</div>
<div className="make-a-comment-container">
            <div className="emoji-container">
            <div className="fa fa-user-circle fa-2x"></div>
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
                    placeholder="Write a comment..."
                />
            </label>
            </form>
            </div>
        </div>

      </div>

  );
}

export default PostCard;
