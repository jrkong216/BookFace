import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {createNewLike, deleteLike} from "../../store/likes"
import {loadAllPosts} from "../../store/posts"
import OpenCommentModal from "../OpenCommentModal"

import "./CreateALike.css"

function CreateALike({post, sessionUser, commentByPostId, closeModal}){
    const dispatch = useDispatch()
    if (!sessionUser){
        return null
    }
    let post_id = post.id
    let user_id = sessionUser.id

    // console.log("this is post", post)
    const postLikeArray= post.likes

    const likeByUser = postLikeArray.filter(like => like && like.user_id === sessionUser?.id)

    // console.log("this is likesarry By USER", likeByUser)
    let objectLikeByUser = likeByUser[0]
    // console.log("this is objjectlikeByUser", objectLikeByUser)
    // console.log("this is the id I want to delete", objectLikeByUser?.id)


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
        <>
                <div className="likes-container">
            <div className="likes">Likes: {post.likes.length}</div>
            {/* <div className="likes">Likes: {post.likes}</div> */}
        </div>

        <div className="likecomment-description-container">
            <div className="Like-container">
            {!(likeByUser.length === 0) ?<button className="fa-solid fa-thumbs-up" onClick={() => deleteLikeHandler()}> LIKE</button>: <button className="fa-regular fa-thumbs-up" onClick={() => likeHandler()}> LIKE</button>}
            </div>
            <div className="Comment-Container">
            <OpenCommentModal post={post} commentByPostId={commentByPostId} sessionUser={sessionUser}/>
            </div>
        </div>
        </>
    )

}


export default CreateALike
