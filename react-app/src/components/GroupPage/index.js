import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom"
import {loadAllPosts} from '../../store/posts'
import {loadAllComments} from "../../store/comments"
import {loadAllGroups} from "../../store/groups"
import PostCard from "../PostCard"
import CreateAPost from '../CreateAPost';
import LeftCard from "../LeftCard"
import RightCard from "../RightCard"
import "./GroupPage.css"


const GetGroupPosts = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const { groupId } = useParams()
    const sessionUser = useSelector((state) => state.session.user);
    // console.log("this is sessionUser IN HOME PAGE", sessionUser)
    useEffect(() => {
        dispatch(loadAllPosts())
        dispatch(loadAllComments())
        dispatch(loadAllGroups())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const allPosts = useSelector(state => state.posts)
    // console.log("this is state of spots", allSpots)
    const allPostsArray = Object.values(allPosts)
    const postsByUserId = allPostsArray.filter(post => sessionUser && post.user_id === sessionUser.id)
    // console.log("this is allspots array", allPostsArray)

    const allGroups = useSelector(state =>state.groups)
    console.log("this is allgrous", allGroups)
    const allGroupsArray = Object.values(allGroups)
    const groupByGroupId = allGroupsArray.filter(group => group.id === +groupId)
    console.log("this is groupByGroupID", groupByGroupId)
    const objectGroupByGroupId = groupByGroupId[0]

    if (!isLoaded){
    return (<div>Loading...</div>)
    }
    // if (!postsByUserId){
    //     return null
    // }

    return (
        <>
        <div className="top-profilepage-container">
            <div className="User-Information-container">
                <div className="spot-card-profile-circle-container">
                    <i className="fa fa-user-circle fa-8x" aria-hidden="true"></i>
                </div>
                <div classname="name-description-containter">
                <div className="UserInformation">
                    {sessionUser && objectGroupByGroupId.name}

                </div>
                <div className="GroupDescription">
                {sessionUser && objectGroupByGroupId.description}
                </div>
                </div>
            </div>
        </div>
        <div className="home-post-container">
            <LeftCard/>
            <h1>Group Postings Comming in New Feature</h1>
            <RightCard/>
        </div>
        </>
    )
}

export default GetGroupPosts
