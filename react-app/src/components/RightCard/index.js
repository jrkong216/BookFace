import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink, useHistory} from "react-router-dom"
import {loadAllGroups} from "../../store/groups"
import Airbnb from "./AirbnbScreenShot.png"
import CodeBunny from "./CodeBunnyNew.png"
import "./RightCard.css"


const SponsoredPosts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)

    // const airbnbHandler = (e) => {
    //     e.preventDefault();
    //     history.push(`/`);
    //   };

    // const codeBunnyHandler = (e) => {
    //     e.preventDefault();
    //     history.push(`/current/user`);
    //   };

    return (
            <div className="group-container-right">
                <div className="sponsored-post-one"> Sponsored by Airbnb2
                    <a className="sponsored-post-one-image-container" href="https://authen-me-airbnb2.herokuapp.com/" target="_blank">
                    <img src={Airbnb} alt="logo" />
                    </a>
                </div>
                <div className="sponsored-post-two"> Sponsored by CodeBunny
                    <a className="sponsored-post-two-image-container" href="https://codebunny.onrender.com/" target="_blank">
                    <img src={CodeBunny} alt="logo" />
                    </a>
                </div>
            </div>

    )
}

export default SponsoredPosts
