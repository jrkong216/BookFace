import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import{useHistory} from 'react-router-dom'
import {createNewPost} from "../../store/posts"
import { loadAllComments } from "../../store/comments";

function CreatePostForm({closeModal, setShowCreateModal}) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [description, setDescription] = useState('')
    const [img_url, setImgUrl] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

  const submitHandler = async (e) => {
    e.preventDefault()

      const errors = []

          if (!description.length) errors.push("Please provide a name")
          if (!img_url.length) errors.push("Please provide an address");

      setValidationErrors(errors)

    const payload = {
      description,
      img_url
  }

  if(errors.length){
    return null
  }

  let createdPost;

  createdPost = await dispatch(createNewPost(payload))
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
        <h2 className="title-words">Create Post</h2>
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
            onChange={(e)=> setDescription(e.target.value)}
            value={description}
            placeholder="Whats on your mind"
          />
        </label>
        <label>
          img_url
          <input
          className="form-inputs"
          required
            type="text"
            name="img_url"
            onChange={(e)=> setImgUrl(e.target.value)}
            value={img_url}
            placeholder="img_url"
          />
        </label>
        </div>
        <div className="button-container">
        <button className="Create-Spot-button"
          type="submit"
          // disable={setValidationErrors.length > 0 ? true : false}
            // disabled={!!validationErrors.length}
        >
          Create Post
        </button>
        </div>
      </form>

        </div>

      </div>

    );
  }

  export default CreatePostForm;
