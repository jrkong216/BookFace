import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadAllPosts} from '../../store/posts'
import {loadAllComments} from "../../store/comments"
import {loadAllLikes} from "../../store/likes"
import {loadAllGroups} from "../../store/groups"
import PostCard from "../PostCard"
import CreateAPost from '../CreateAPost';
// import RightCard from "../RightCard"
import "./Posts.css"


const GetAllPosts = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector((state) => state.session.user);
    // console.log("this is sessionUser IN HOME PAGE", sessionUser)
    useEffect(() => {
        dispatch(loadAllPosts())
        dispatch(loadAllComments())
        dispatch(loadAllLikes())
        dispatch(loadAllGroups())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const allPosts = useSelector(state => state.posts)
    // console.log("this is state of spots", allSpots)
    const allPostsArray = Object.values(allPosts)
    // console.log("this is allspots array", allPostsArray)
    if (!isLoaded){
    return (<div>Loading...</div>)
    }

    return (
        <div className="home-post-container">
            <div className="group-container-left">
                <div>
                    <div className="tab-home">Home</div>
                </div>
                <div>
                    <div className="tab-name">Jason Kong</div>
                </div>
                <div>
                    <div className="tab-watch">Watch</div>
                </div>
                <div>
                    <div className="tab-marketplace">Marketplace</div>
                </div>
                <div>
                    <div className="tab-gaming">Gaming</div>
                </div>
                <div>
                    <div className="tab-map">MAP OUT THE GROUPS HERE</div>
                </div>
                <div>
                    <div className="tab-create-group">Create Group BUTTON HERE</div>
                </div>

            </div>
            <div className= "all-spots-card-container">
            <CreateAPost sessionUser={sessionUser}/>
        {allPostsArray.slice(0).reverse().map((post)=>
        // {allPostsArray.map((post)=>
            <PostCard key={post.id} post={post} />
            )}
            </div>
            {/* <RightCard sessionUser={sessionUser}/> */}
            <div className="friends-list-container-right">

            </div>
        </div>

    )
}

export default GetAllPosts
