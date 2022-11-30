// frontend/src/components/SignupFormPage/SignupForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import{useHistory} from 'react-router-dom'
import "./SignupForm.css"

function SignupForm() {
  const dispatch = useDispatch();
  const history  = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email.includes("@") !== true){
      return setErrors([`Please provide a valid email with "@" symbol`])
    }

    if(first_name.length > 20){
      return setErrors([`First name cannot be longer than 20 characters`])
    }
    if(last_name.length > 20){
      return setErrors([`Last name cannot be longer than 20 characters`])
    }

    if (password === confirmPassword){
      setErrors([]);
      return dispatch(sessionActions.signup({ first_name, last_name, email, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      return setErrors(['Confirm Password field must be the same as the Password field'])
    }
  };

  if (sessionUser) history.push("/homepage")


  return (

    <div className="outer-sign-container">
        <div className="inner-sign-container">
    <form onSubmit={handleSubmit}>
      <div className="form-sign-container">
        <div className="title-sign-container">
          <div className="modal-sign-up">Sign Up</div>
          <div className="modal-sign-next">Its quick and easy.</div>
        </div>
        <div className="errors">
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
        <div className="inner-form-sign-container">
          <div className= "box-for-first-last-name">
        <label>
        <input
        className="form-sign-first-inputs"
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First Name"
        />
      </label>
      <label>
        <input
        className="form-sign-last-inputs"
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last Name"
        />
      </label>
      </div>
      <label>
        <input
        className="form-sign-inputs"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
      </label>
      <label>

        <input
        className="form-sign-inputs"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </label>
      <label>

        <input
        className="form-sign-inputs"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm Password"
        />
      </label>
      </div>
      <div className="button-sign-container">
      <button className="Sign-Up-button" type="submit">Sign Up</button>
      </div>
      </div>
      </form>
      </div>
    </div>

  );
}
export default SignupForm;
