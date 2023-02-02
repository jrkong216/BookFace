import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import {createNewPost, createNewPostNoImage} from "../../store/posts"
import { loadAllComments } from "../../store/comments";
import "./CreatePostForm.css"
import DragDropFile from "../DragDropFile"

function CreatePostForm({closeModal, sessionUser}) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('')
    const [img_url, setImgUrl] = useState(null)
    const [validationErrors, setValidationErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false);
console.log("THIS IS IMG URL!!!", img_url)
  useEffect(() => {
    const errors = []

    if (description.length > 254){errors.push("You have reached your 255 character limit")}

    setValidationErrors(errors)

  }, [description])



    const submitPostHandler = async (e) => {
    e.preventDefault()


    if (img_url === null){
          const payload = {
          description,
          img_url:""
          }

          let createdPost;
  createdPost = await dispatch(createNewPostNoImage(payload)).then(()=>dispatch(loadAllComments()))
  closeModal()
    }
     else{
      const errors = []
      // const validUrls = ["img", "jpg", "jpeg", "png"]
      // let urlArray = img_url.split(".")
      // let urlExtension = urlArray[urlArray.length - 1]

      //     if (img_url && !validUrls.includes(urlExtension)) {
      //      errors.push("Please enter an image in .png, .jpg, .jpeg, or .img format")
      //     }

          // if (!description.length) errors.push("Please let us know whats on your mind")

          // console.log("this is desscription", description, "and thi sis the length", description.length)
      // setValidationErrors(errors)


      const formData = new FormData()
      formData.append("description", description)
      formData.append("content", img_url)
console.log("THIS IS formData", formData)
//     const payload = {
//       description,
//       img_url
//   }
// console.log("this is payload", payload)
  if(errors.length){
    return null
  }
  setIsLoading(true)
  // let createdPost;
  // createdPost = await dispatch(createNewPost(formData)).then(()=>dispatch(loadAllComments()))
  // closeModal()
  await dispatch(createNewPost(formData)).then(
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
        className="spot-form" onSubmit={submitPostHandler}
      >
        <div className="create-title-box">
        <div className="create-title-words">Create Post</div>
        </div>
        <div className="avatar-name-container">
        <div className="spot-card-profile-circle-container">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
          </div>
          <div className="create-post-UserName">
            {sessionUser && sessionUser.first_name} {sessionUser && sessionUser.last_name}
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
             required
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
            pattern="https://.*" size="30"

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
        {/* <DragDropFile/> */}
        <div className="button-container">
        <button className="Create-Post-button"
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
