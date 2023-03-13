import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadAllPosts} from '../../store/posts'
import {loadAllComments} from "../../store/comments"
import PostCard from "../PostCard"
import CreateAPost from '../CreateAPost';
import LeftCard from "../LeftCard"
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
                    {sessionUser && sessionUser.first_name} {sessionUser && sessionUser.last_name}
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
                    {sessionUser && sessionUser.first_name} {sessionUser && sessionUser.last_name}
                </div>
            </div>
        </div>
        <div className="home-post-container">
        <LeftCard/>
            <div className= "all-spots-card-container">
            <CreateAPost sessionUser={sessionUser}/>
        {postsByUserId.slice(0).reverse().map((post)=>
        // {allPostsArray.map((post)=>
            <PostCard key={post.id} post={post} />
            )}
            </div>
            {/* <RightCard sessionUser={sessionUser}/> */}
            <div className="friends-list-container-right">
                {/* {newArr.map((post)=>
                    <div className="profile-names" key={post.users.first_name}>{post.users.first_name}{post.users.last_name}
                        <div className="suggestion-profile-circle-container">
                            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                        </div>
                    </div> )} */}
            </div>

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

export default GetUserPosts
