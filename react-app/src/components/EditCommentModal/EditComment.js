import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
// import {editPost} from "../../store/posts"
import {editComment, loadAllComments} from "../../store/comments"
import "./EditComment.css"

function EditComment({item, closeModal}) {

  const dispatch = useDispatch();
  const [description, setComment] = useState('')

  const [validationErrors, setValidationErrors] = useState([])

  // useEffect(() => {
  //     dispatch(getOneSpot(spotId))
  //   }, [dispatch])

    useEffect(() => {
      setComment(item && item.description)
    }, [item])



const submitHandler = async (e) => {
  e.preventDefault()

    const errors = []
    if (description & description.length > 10){
      errors.push("You have reached your 500 character limit")
    }


    setValidationErrors(errors)

  const payload = {
    id: item.id,
    description
}
console.log("this is payload", payload)
if(errors.length){
  return null
}

let editedComment;

editedComment = await dispatch(editComment(payload)).then(()=>dispatch(loadAllComments()))
closeModal()


}


  return (
    <div className="editcommentform-Outer-Container">
        <div className="editcommentform-Inner-Container">
      <form
        className="spot-form" onSubmit={submitHandler}
      >
        <div className="create-title-box">
        <div className="create-title-words">Edit Comment</div>
        </div>
        <div className="avatar-name-container">
        <div className="spot-card-profile-circle-container">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
          </div>
          <div className="create-post-UserName">
          {item.users && item.users.first_name} {item.users && item.users.last_name}
          </div>
          </div>
        <div className="errors">
          {validationErrors.length > 0 &&
            validationErrors.map((error) =>
            <div key={error}>{error}</div>
          )}
        </div>
        <div className="form-container">

        <div className="post-container">
          <textarea className="input-box"
            id="first-name"
            label="Name"
              value={description}
             onChange={(e)=> setComment(e.target.value)}
             placeholder="Whats on your mind"
             margin="normal"
            required
      />
      </div>

        </div>
        <div className="button-container">
        <button className="Edit-Comment-button"
          type="submit"
          // disable={setValidationErrors.length > 0 ? true : false}
            // disabled={!!validationErrors.length}
        >
          Edit Comment
        </button>
        </div>
      </form>

        </div>

      </div>

  );
}

export default EditComment;
