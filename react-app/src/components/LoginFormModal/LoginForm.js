// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import{useHistory} from 'react-router-dom'
import DemoUser from "../DemoUser";
import "./LoginForm.css"

function LoginForm() {
  const dispatch = useDispatch();
  const history  = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  if (sessionUser) history.push("/hompage")

  return (
    <div className="Outer-modal-Container">
        <div className="Inner-modal-Container">
    <form onSubmit={handleSubmit}>

      <div className="User-Email-Container">
      <div className="title-log-container">
        <h2>Welcome to AirBnb2</h2>
        </div>
        <div className="errors">
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
        <div className="inner-form-sign-container">
      <label>
        Username or Email
        <input
        className="form-inputs"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email"
        />
      </label>
      </div>
      <div className="Password-Container">
      <label>
        Password
        <input
        className="form-inputs"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </label>
      </div>
      </div>
      <div className="Login-Container">
      <button className="Login-Button" type="submit">Log In</button>
      </div>
      <div className="Demo-Container">
      <DemoUser/>
      </div>
    </form>
      </div>
    </div>
  );
}

export default LoginForm;
