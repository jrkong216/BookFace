import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom"
import {loadAllPosts} from '../../store/posts'
import {loadAllComments} from "../../store/comments"
import {loadAllGroups} from "../../store/groups"
import PostCard from "../PostCard"
import CreateAPost from '../CreateAPost';
import "./ProfilePage.css"


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

    let postsOrNot
    if(postsByUserId.length === 0){
        postsOrNot = (
            <>
            <div className="top-profilepage-container">
            <div className="User-Information-container">
                <div className="spot-card-profile-circle-container">
                    <i className="fa fa-user-circle fa-8x" aria-hidden="true"></i>
                </div>
                <div className="UserInformation">
                    {sessionUser && sessionUser.first_name}
                </div>
            </div>
        </div>
        <div className="home-container">
        <div className= "all-spots-card-container">
        <CreateAPost sessionUser={sessionUser}/>
        <div className = "make-firstpost">You should make your first post by telling us whats on your mind!</div>
        </div>
        {/* <RightCard sessionUser={sessionUser}/> */}
    </div>
    </>
         )
    } else {
     postsOrNot = (
        <>
        <div className="top-profilepage-container">
            <div className="User-Information-container">
                <div className="spot-card-profile-circle-container">
                    <i className="fa fa-user-circle fa-8x" aria-hidden="true"></i>
                </div>
                <div className="UserInformation">
                    {sessionUser && objectGroupByGroupId.name}
                </div>
            </div>
        </div>
        <div className="home-container">
            <div className= "all-spots-card-container">
            <CreateAPost sessionUser={sessionUser}/>
        {postsByUserId.slice(0).reverse().map((post)=>
        // {allPostsArray.map((post)=>
            <PostCard key={post.id} post={post} />
            )}
            </div>
            {/* <RightCard sessionUser={sessionUser}/> */}

        </div>
        </>
     )
    }




    return (
        <>
        {postsOrNot}
        </>
    )
}

export default GetGroupPosts
