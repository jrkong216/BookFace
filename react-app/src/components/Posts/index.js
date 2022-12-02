import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadAllPosts} from '../../store/posts'
import {loadAllComments} from "../../store/comments"
import {loadAllLikes} from "../../store/likes"
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
        <div className="home-container">
            <div className= "all-spots-card-container">
            <CreateAPost sessionUser={sessionUser}/>
        {allPostsArray.slice(0).reverse().map((post)=>
        // {allPostsArray.map((post)=>
            <PostCard key={post.id} post={post} />
            )}
            </div>
            {/* <RightCard sessionUser={sessionUser}/> */}

        </div>

    )
}

export default GetAllPosts
