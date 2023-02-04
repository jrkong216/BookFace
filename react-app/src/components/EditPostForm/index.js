import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import{useHistory} from 'react-router-dom'
import {editPost, editPostAWS} from "../../store/posts"

function EditPostForm({closeModal, post}) {
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const [description, setDescription] = useState('')
    const [img_url, setImgUrl] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false);
console.log("this is img_url or current file", img_url)
      useEffect(() => {
        setDescription(post && post.description)
        setImgUrl(post && post.img_url)
      }, [post])

      useEffect(() => {
        const errors = []
        if (description.length > 254){errors.push("You have reached your 255 character limit")}
        setValidationErrors(errors)
      }, [description])

      const postId = post.id

  const submitHandler = async (e) => {
    e.preventDefault()


      // const validUrls = ["img", "jpg", "jpeg", "png"]
      // let urlArray = img_url.split(".")
      // let urlExtension = urlArray[urlArray.length - 1]

      //     if (img_url && !validUrls.includes(urlExtension)) {
      //      errors.push("Please enter an image in .png, .jpg, .jpeg, or .img format")
      //     }
      //     if (!description.length) errors.push("Please let us know whats on your mind")
      //     // if (description & description.length > 500){errors.push("You have reached your 500 character limit")}

      // setValidationErrors(errors)

    if (typeof(img_url) === "string"){
      console.log("NO IMAGE UPLOADED, just desciprtion CHANGED CLICKED")
      const payload = {
        id: post.id,
        description,
        img_url
      }

    let editedPost;

    editedPost = await dispatch(editPost(payload))
    closeModal()
    history.push(`/homepage`)

    }
      else{
        console.log("did THE ELSE STATEMENT FIRE")
        console.log("IMAGE UPLOADED, NEW IMAGE WAS SET IN!")
      const errors = []

      const formData = new FormData()
      formData.append("description", description)
      formData.append("content", img_url)

  if(errors.length){
    return null
  }
  setIsLoading(true)
  // let createdPost;
  // createdPost = await dispatch(createNewPost(formData)).then(()=>dispatch(loadAllComments()))
  // closeModal()
  await dispatch(editPostAWS(formData, postId)).then(
    async (res) => {
        if (res && res.errors?.length > 0) {
            setErrors(res.errors)
            setIsLoading(false)
        } else {
            // setShowModal(false)
            setIsLoading(false)
        }
      }
  )
closeModal()
    }
  }


    return (
<div className="creatpostform-Outer-Container">
        <div className="creatpostform-Inner-Container">
      <form
        className="spot-form" onSubmit={submitHandler}
      >
        <div className="create-title-box">
        <div className="create-title-words">Edit Post</div>
        </div>
        <div className="avatar-name-container">
        <div className="spot-card-profile-circle-container">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
          </div>
          <div className="create-post-UserName">
          {post.users && post.users.first_name} {post.users && post.users.last_name}
          </div>
          </div>
        <div className="errors">
          {validationErrors.length > 0 &&
            validationErrors.map((error) =>
            <div key={error}>{error}</div>
          )}
        </div>
        <div className="form-container">
        {/* <label>
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
        </label> */}
        <div className="post-container">
          <textarea className="input-box"
            id="first-name"
            label="Name"
            maxLength={255}
            minLength={1}
              value={description}
             onChange={(e)=> setDescription(e.target.value)}
             placeholder="Whats on your mind"
             margin="normal"
      />
      </div>
        {/* <label>
          <input
          className="form-inputs"
          // required
            type="text"
            name="img_url"
            onChange={(e)=> setImgUrl(e.target.value)}
            value={img_url}
            placeholder='Must start with "https:" OR leave blank'
          />
        </label> */}
        </div>
        <div className="file-container">
                            <label> Upload your image
                                <input id="image-file-input-area"
                                    type="file"
                                    placeholder="Drop your image file(.jpg and .png format)"
                                    //value={video}
                                    // accept="image/jpg, image/png"
                                    onChange={(e) => setImgUrl(e.target.files[0])
                                    }
                                    // required
                                />
                            </label>

                        </div >
        <div className="button-container">
        <button className="Create-Post-button"
          type="submit"
          // disable={setValidationErrors.length > 0 ? true : false}
            // disabled={!!validationErrors.length}
        >
          Edit Post
        </button>
        </div>
      </form>

        </div>

      </div>

    );
  }

  export default EditPostForm;
