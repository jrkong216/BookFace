import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import {createNewPost, createNewPostNoImage} from "../../store/posts"
import { loadAllGroups, createNewGroup } from "../../store/groups";
import "./CreateGroupForm.css"
import DragDropFile from "../DragDropFile"

function CreateGroupForm({closeModal, sessionUser}) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('')
    const [name, setName] = useState("")
    const [validationErrors, setValidationErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false);
// console.log("this is name", name)
  useEffect(() => {
    const errors = []

    if (description.length > 254){errors.push("You have reached your 255 character limit")}

    setValidationErrors(errors)

  }, [description])



    const submitPostHandler = async (e) => {
    e.preventDefault()

    const errors = []
    if (description & description.length > 10){
      errors.push("You have reached your 500 character limit")
    }


    setValidationErrors(errors)

  const payload = {
    name,
    description
}
// console.log("this is payload", payload)
if(errors.length){
  return null
}

let editedGroup;

editedGroup= await dispatch(createNewGroup(payload)).then(()=>dispatch(loadAllGroups()))
closeModal()



}

    return (
      <div className="creatpostform-Outer-Container">
        <div className="creatpostform-Inner-Container">
      <form
        className="spot-form" onSubmit={submitPostHandler}
      >
        <div className="create-title-box">
        <div className="create-title-words">Create Group</div>
        </div>
        <div className="errors">
          {validationErrors.length > 0 &&
            validationErrors.map((error) =>
            <div key={error}>{error}</div>
          )}
        </div>
        <div className="form-container">
        <label>
          <input
          className="form-inputs"
          required
            type="text"
            name="name"
            maxLength={20}
            minLength={1}
            onChange={(e)=> setName(e.target.value)}
            value={name}
            placeholder="Name of Group"
          />
        </label>
        <div className="post-container">
          <textarea className="input-box"
            id="first-name"
            label="Description"
            maxLength={255}
            minLength={1}
              value={description}
             onChange={(e)=> setDescription(e.target.value)}
             placeholder="Describe your Group"
             margin="normal"
             required
      />
      </div>
        </div>
        <div className="button-container">
        <button className="Create-Post-button"
          type="submit"
          // disable={setValidationErrors.length > 0 ? true : false}
            // disabled={!!validationErrors.length}
        >
          Create Group
        </button>
        </div>
      </form>

        </div>

      </div>

    );
  }

  export default CreateGroupForm;
