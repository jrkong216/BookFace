import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import{useHistory} from 'react-router-dom'
import {editPost} from "../../store/posts"

function EditPostForm({closeModal, post}) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [description, setComment] = useState('')

    const [validationErrors, setValidationErrors] = useState([])
    console.log("this is post", post)
    // useEffect(() => {
    //     dispatch(getOneSpot(spotId))
    //   }, [dispatch])

      useEffect(() => {
        setComment(post && post.description)
      }, [post])



  const submitHandler = async (e) => {
    e.preventDefault()

      const errors = []

          if (!description.length) errors.push("Please provide a name")
          if (!img_url.length) errors.push("Please provide an address");

      setValidationErrors(errors)

    const payload = {
      id: post.id,
      description,
      img_url
  }

  if(errors.length){
    return null
  }

  let editedPost;

  editedPost = await dispatch(editPost(payload))
  closeModal()
  history.push(`/homepage`)

  }


    return (
      <div className="Outer-Container">
        <div className="Inner-Container">
      <form
        className="spot-form" onSubmit={submitHandler}
      >
        <div className="title-box">
        <h2 className="title-words">Edit Comment</h2>
        </div>
        <div className="errors">
          {validationErrors.length > 0 &&
            validationErrors.map((error) =>
            <div key={error}>{error}</div>
          )}
        </div>
        <div className="form-container">
        <label>
          Description
          <input
          className="form-inputs"
          required
            type="text"
            name="description"
            onChange={(e)=> setComment(e.target.value)}
            value={description}
            placeholder="Whats on your mind"
          />
        </label>

        </div>
        <div className="button-container">
        <button className="Create-Spot-button"
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

  export default EditPostForm;
