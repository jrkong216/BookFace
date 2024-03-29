import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {createNewLike, deleteLike, loadAllLikes} from "../../store/likes"
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
    // console.log("thjis is postlikeArray", postLikeArray)

    const likeByUser = postLikeArray.filter(like => like && like.user_id === sessionUser?.id)
    console.log("this si likeByUSER", likeByUser)
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

        if (likeByUser.length === 0) {
        let like
        // like = await dispatch(createNewLike(post_id, user_id, payload)).then(()=>dispatch(loadAllPosts()))
        like = await dispatch(createNewLike(post_id, user_id, payload))
        // await dispatch(loadAllLikes())
        await dispatch(loadAllPosts())
        }
        }



       const deleteLikeHandler = async () => {
        // console.log("DELETELIKEHANDLER CLICKED!")
        // console.log("this is posters_name", post.users.first_name)
        // e.preventDefault()

        const payload = {
            id: objectLikeByUser?.id
        }
        // console.log("this is payload", payload)
        if (likeByUser.length >= 1){
        let deletedlike
        // deletedlike= await dispatch(deleteLike(payload)).then(()=>dispatch(loadAllPosts()))
        deletedlike= await dispatch(deleteLike(payload))
        // await dispatch(loadAllLikes())
        await dispatch(loadAllPosts())
        }
       }

    return(
        <>
                <div className="likes-container">
                {(postLikeArray.length === 0) ? null:<div className="fa-solid fa-thumbs-up"> {post.likes.length}</div>}
            {/* <div className="fa-regular fa-thumbs-up">{post.likes.length}</div> */}
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
