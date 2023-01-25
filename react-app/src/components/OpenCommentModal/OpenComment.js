import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import EditCommentModal from "../EditCommentModal";
import CreateALike from "../CreateALike";
import {createNewLike, deleteLike} from "../../store/likes"
import {loadAllPosts} from "../../store/posts"
import {loadAllComments, createNewComment, deleteComment, clearAllComments} from "../../store/comments"
import "./OpenComment.css"

function OpenComment({post, commentByPostId, sessionUser, closeModal}) {
    const dispatch = useDispatch()
    let post_id = post.id
    let user_id = sessionUser.id
    const postLikeArray= post.likes

    const likeByUser = postLikeArray.filter(like => like && like.user_id === sessionUser?.id)
    let objectLikeByUser = likeByUser[0]
useEffect(() => {
    dispatch(loadAllPosts(post.id))
}, [dispatch])

const [description, setComment] = useState("");
const postHandler = async (e) =>{
    e.preventDefault()

    const payload = {
        description
    }
// console.log("this is payload", payload)
    let createdComment;

  createdComment = await dispatch(createNewComment(post.id, payload)).then(()=>dispatch(loadAllComments()))

setComment("")
  }
  const deleteCommentHandler = async (id) => {
    console.log("this is id", id)

        const payload = {
            id: id
        }

        let commentToDelete;
        commentToDelete = await dispatch(deleteComment(payload)).then(()=>dispatch(loadAllComments()))

  }
  const likeHandler = async () => {
    // e.preventDefault()

    const payload = {
        post_id,
        user_id
    }

    let like
    like = await dispatch(createNewLike(post_id, user_id, payload)).then(()=>dispatch(loadAllPosts()))

   }

   const deleteLikeHandler = async () => {
    // console.log("DELETELIKEHANDLER CLICKED!")
    // console.log("this is posters_name", post.users.first_name)
    // e.preventDefault()

    const payload = {
        id: objectLikeByUser?.id
    }
    // console.log("this is payload", payload)

    let deletedlike
    deletedlike= await dispatch(deleteLike(payload)).then(()=>dispatch(loadAllPosts()))
   }

    return(

        <div className="modal-comment-outer-container">
            <div className="modal-left-container">
                <div className="modal-spot-image-container">
                <div className="spot-card-profile-circle-container">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
          </div>
          <div className="UserName">
            {post.users && post.users.first_name} {post.users && post.users.last_name}

          </div>

                <div className="description">{post.description}</div>

                <div className="likes-container">
            <div className="likes">Likes: {post.likes.length}</div>
            {/* <div className="likes">Likes: {post.likes}</div> */}
        </div>

        <div className="likecomment-description-container">
            <div className="Like-container">
            {!(likeByUser.length === 0) ?<button className="fa-solid fa-thumbs-up" onClick={() => deleteLikeHandler()}> LIKE</button>: <button className="fa-regular fa-thumbs-up" onClick={() => likeHandler()}> LIKE</button>}
            </div>
            
        </div>
                {post.img_url === ""? null :<div className="spot-image-container">
          <img className="modal-spot-image" src={post.img_url} alt="to be seen"
                onError={e => { e.currentTarget.src = "https://i.stack.imgur.com/6M513.png"}}/>
        </div>}

                </div>
            </div>

            <div className="modal-right-container">
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
                                {sessionUser && sessionUser.id === item.user_id ?<button className="fa fa-trash" id="trashcan" onClick= {() => deleteCommentHandler(item.id, item.user_id)}></button>:null }

                                </div>
                            </div>

                        )})
                    }

</div>
<div className="make-a-comment-container">
  <div className="avatar-input-container">
            <div className="emoji-container">
            <div className="fa fa-user-circle fa-2x"></div>
            </div>
            <div className="actual-comment-container">
            <form className="form-post-container" onSubmit={postHandler}>
            <label>
                <input
                    className="spot-card-form-inputs"
                    type="text"
                    maxLength={255}
                    minLength={1}
                    value={description}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="Write a comment..."
                />
            </label>

            </form>
            </div>
            </div>
            <div className = "bottom-character-comment-container">
                    {description.length === 255 ? <span className="charLeft" style={{color:"red"}}>
              {description.length} / 255
                </span> :<span className="charLeft">
              {description.length} / 255
                </span> }
                    </div>
        </div>


            </div>


        </div>
    )
}

export default OpenComment
