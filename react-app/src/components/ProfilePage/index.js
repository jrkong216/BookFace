import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadAllPosts} from '../../store/posts'
import {loadAllComments} from "../../store/comments"
import PostCard from "../PostCard"
import CreateAPost from '../CreateAPost';
import "./ProfilePage.css"


const GetUserPosts = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector((state) => state.session.user);
    // console.log("this is sessionUser IN HOME PAGE", sessionUser)
    useEffect(() => {
        dispatch(loadAllPosts())
        dispatch(loadAllComments())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const allPosts = useSelector(state => state.posts)
    // console.log("this is state of spots", allSpots)
    const allPostsArray = Object.values(allPosts)
    const postsByUserId = allPostsArray.filter(post => sessionUser && post.user_id === sessionUser.id)
    // console.log("this is allspots array", allPostsArray)
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
                <div className="UserInformation">
                    {sessionUser && sessionUser.first_name} {sessionUser && sessionUser.last_name}
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

export default GetUserPosts
