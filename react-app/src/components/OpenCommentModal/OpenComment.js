import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import EditCommentModal from "../EditCommentModal";
import {createNewLike, deleteLike} from "../../store/likes"
import {loadAllPosts} from "../../store/posts"
import "./OpenComment.css"
function OpenComment({spot, commentBySpotId, deleteCommentHandler, post, commentByPostId}) {
    const dispatch = useDispatch()
    // const [review, setComment] = useState("");
    // const [stars, setStars] = useState(1)
// console.log("is this showing up? comment form")
// console.log("this is spot", spot)
// let spotId = spot.id
// console.log("this is spotID in OpenCOmment", spotId)

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

        <div className="comment-outer-container">
            <div className="left-container">
                <div className="spot-image-container">
                    <img className="spot-image" src={post && post.img_url} />
                </div>
            </div>

            <div className="right-container">
            {/* <div className="spot-link-container" to={`/spots/${spot.id}`}> */}
            <div className="spot-link-container">
      <div className="spot-container">
        <div className="top-spot-container">
          <div className="spot-card-profile-circle-container">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
          </div>
          {/* <div className="UserName">
            {spot.ownerId} thisisOwnerID Needs to be UserName[re-do backend]
          </div> */}
        </div>

        <div className="font-awesome-container">
            <div className="heart-container">
            <i class="fa-regular fa-heart fa-lg"></i>
            </div>
            <div className="comment-container" >
            <i class="fa-regular fa-comment fa-lg"></i>
            </div>
        </div>
        <div className="likes-container">
            <div className="likes">Likes go here</div>
        </div>

        <div className="userName-description-container">
            <div className="userName-container">
            {/* <div className="userName">{spot.ownerId} this needs to be userNAME</div> */}
            </div>
            <div className="userDescription-container">
            {/* <div className="description-container">{spot.description}</div> */}
            </div>
        </div>

<div className="new-comments-container">
{commentByPostId.map((item) => {
                        return (
                            <div className= "comment-box-container" key={item.id}>

                                <div className="spot-review-name"> { item.User ? item.User.firstName : null}:</div>
                                {/* <div className="spot-review-name"> { item.User && item.User.firstName}:</div> */}
                                <div className= "item-comment-container">
                                <div className="item-comment"> {item.review}</div>
                                </div>
                                <div className="comment-delete-button-container">
                                <button className="Comment-Delete-Button" onClick= {() => deleteCommentHandler(item.id, item.userId)}>Delete Comment</button>
                                </div>
                                {/* <EditCommentModal item={item} spotId={spotId} /> */}
                                <EditCommentModal/>
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
            {/* <label>
                <input
                    className="spot-card-form-inputs"
                    type="text"
                    value={review}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="Comment Here"
                />
            </label> */}
            <div className="post-button-container">
                <button className="post-text" type="submit">Post</button>
            </div>
            </form>
            </div>
        </div>
      </div>
    </div>

            </div>


        </div>
    )
}

export default OpenComment
