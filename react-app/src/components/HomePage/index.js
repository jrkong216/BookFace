import { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router-dom';
import bookfacelogo from "./Images/bookfacelogo.png"

import DemoUser from "../DemoUser";
import { Modal } from '../../context/Modal'
import SignupFormModal from '../SignupFormModal/SignupForm'

import './HomePage.css';


const HomePage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const [email, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);


      const handleSubmit = (e) => {
        console.log("is this happeneing?")
      e.preventDefault();
      setErrors([]);

      return dispatch(sessionActions.login({ email, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    };

  if (sessionUser) history.push("/homepage")

    return (
      <div className="home-container">
        <div className="home-inner-container">
          <div className="left-container">
            <div className= "left-top-cotainer">
            <img className="facebook-logo" src={bookfacelogo} alt="facebookLogo" />
            </div>
            <div className= "left-middle-cotainer">
              <div className= "Recent-Login">Recent Logins</div>
              <div className= "click-your-picture">Click Demo Button to sign in as a Demo User</div>
            </div>
            <div className= "left-bottom-cotainer">
            <div className="Demo-Container">
                  <DemoUser />
                </div>
            </div>

          </div>
          <div className="right-container">
            <div className="right-top-container">

              <form onSubmit={handleSubmit}>
                <div className="User-Email-Container">
                  <div className="errors">
                    {errors.map((error, idx) => (
                      <div key={idx}>{error}</div>
                    ))}
                  </div>
                  {/* <div className="inner-form-sign-container"> */}
                    <label>

                      <input
                        className="form-inputs"
                        type="text"
                        value={email}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                        placeholder="Email"
                      />
                    </label>
                  {/* </div> */}
                  {/* <div className="Password-Container"> */}
                    <label>

                      <input
                        className="form-inputs"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                      />
                    </label>
                  {/* </div> */}
                </div>
                {/* <div className="Login-Container"> */}
                  <button className="Login-Button" type="submit">
                    Log In
                  </button>
                {/* </div> */}


              </form>
              <div className= "Create-New-Account-Container">
              <button className="Create-New-Account" onClick={() => setShowModal(true)}>Create new account</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>

                        <SignupFormModal />
                    </Modal>
                    )}
              </div>

            </div>
            
          </div>
          <div>
            {/* <div className="log-out" onClick={logout}>
              Log Out
            </div> */}
          </div>
        </div>
      </div>
      // </div>
    );
}

export default HomePage
