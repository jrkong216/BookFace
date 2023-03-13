import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink, useHistory} from "react-router-dom"
import {loadAllGroups} from "../../store/groups"
import Airbnb from "./AirbnbScreenShot.png"
import CodeBunny from "./CodeBunnyScreenShot.png"
import "./RightCard.css"


const SponsoredPosts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)


    return (
            <div className="group-container-right">
                <div className="sponsored-post-one"> Sponsored by Airbnb2
                    <div className="sponsored-post-one-image-container">
                    <img src={Airbnb} alt="logo" />
                    </div>
                </div>
                <div className="sponsored-post-two"> Sponsored by CodeBunny
                    <div className="sponsored-post-one-image-container">
                    <img src={CodeBunny} alt="logo" />
                    </div>
                </div>
            </div>

    )
}

export default SponsoredPosts
