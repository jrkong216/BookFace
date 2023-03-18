import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink, useHistory} from "react-router-dom"
import {loadAllGroups} from "../../store/groups"
import GroupCard from "../GroupCard"
import CreateAGroup from '../CreateAGroup';
import EditGroupModal from '../EditGroupModal';
import "./LeftCard.css"


const GetAllPosts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)
    // console.log("this is sessionUser IN HOME PAGE", sessionUser)
    useEffect(() => {
        dispatch(loadAllGroups())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const allGroups = useSelector(state =>state.groups)
    // console.log("this is allgrous", allGroups)
    const allGroupsArray = Object.values(allGroups)

    if (!isLoaded){
    return (<div>Loading...</div>)
    }

    const myHome = (e) => {
        e.preventDefault();
        history.push(`/`);
      };

    const mySpots = (e) => {
        e.preventDefault();
        history.push(`/current/user`);
      };

    return (
            <div className="group-container-left">
                <div className="home-name">
                    <div className="fa-solid fa-house" style={{marginBottom: ".5em"}} onClick={myHome}> Home </div>
                    <div className="fa-solid fa-user-circle" style={{marginBottom: ".5em"}} onClick={mySpots}>  {sessionUser && sessionUser.first_name} {sessionUser && sessionUser.last_name}</div>
                </div>

                <div className="watch-marketplace-gaming">

                    <div className="fa-solid fa-tv" style={{cursor: "not-allowed", marginBottom: ".5em"}}>  Watch</div>
                    <div className="fa-solid fa-shop" style={{cursor: "not-allowed", marginBottom: ".5em"}}> Marketplace</div>
                    <div className="fa-solid fa-gamepad" style={{cursor: "not-allowed", marginBottom: ".5em"}}>    Gaming</div>
                </div>

                <div className="groups-list">
                    <div className="tab-map">
                        {allGroupsArray.map((group)=> {
                            return (

                            <GroupCard key={group.id} group={group} sessionUser={sessionUser}/>)

                            })}
                    </div>
                </div>
                <div>
                    <CreateAGroup/>
                </div>
            </div>

    )
}

export default GetAllPosts
