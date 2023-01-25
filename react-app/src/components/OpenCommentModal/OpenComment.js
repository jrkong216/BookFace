import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import EditCommentModal from "../EditCommentModal";
import {createNewLike, deleteLike} from "../../store/likes"
import {loadAllPosts} from "../../store/posts"
import "./OpenComment.css"
function OpenComment({spot, commentBySpotId, deleteCommentHandler, post, commentByPostId}) {
    const dispatch = useDispatch()


useEffect(() => {
    dispatch(loadAllPosts(post.id))
}, [dispatch])


    const postHandler = async (e) =>{
        e.preventDefault()
    console.log("is code running here")
        const payload = {
            // review,
            // stars
        }
    console.log("this is payload", payload)
        let createdComment;
    // try{
    //   createdComment = await dispatch(CreateReview(spotId, payload))
    //   .then(()=>dispatch(getAllReviews(spotId)))
    // } catch(res) {
    //   const data = await res.json()
    // }

    // setComment("")
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
                {post.img_url === ""? null :<div className="spot-image-container">
          <img className="modal-spot-image" src={post.img_url} alt="to be seen"
                onError={e => { e.currentTarget.src = "https://i.stack.imgur.com/6M513.png"}}/>
        </div>}

                </div>
            </div>

            <div className="modal-right-container">

            </div>


        </div>
    )
}

export default OpenComment
