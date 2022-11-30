// store > posts.js

import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************

// CRUD:
// Create a Post
// GET a Post
// Update/Edit a Post
// Delete a Post

///*************************************************************************** */
const GET_ALLPOSTS = 'posts/getAllPosts'
const GET_ONEPOST = 'posts/getOnePost'
const CREATE_POST = 'posts/createPost'
const UPDATE_POST = 'posts/updatePost'
const DELETE_POST = 'posts/removePost'

///*************************************************************************** */
// **** GET ALL POSTS ****
const getAllPosts = posts => ({
    type: GET_ALLPOSTS,
    payload: posts
})
///*************************************************************************** */
// **** GET ONE POST DETAILS ****
const getOnePost = post => ({
    type: GET_ONEPOST,
    payload: post
})

///*************************************************************************** */
// **** CREATE A POST ****

const createPost = post => ({
    type: CREATE_POST,
    payload: post
})
///*************************************************************************** */
// **** EDIT/UPDATE A POST ****

const updatePost = post => ({
    type: UPDATE_POST,
    payload: post
})
///*************************************************************************** */
// **** DELETE A POST ****

const removePost = postId => ({
    type: DELETE_POST,
    payload: postId
})

// *****************************************************************************
//************************************ THUNKS **********************************

// -------------------------  LOAD ALL POSTS  ----------------------------------
export const loadAllPosts = () => async dispatch => {
    // console.log("did it reach here in the loadAllPost thunk?")
    const response = await csrfFetch('/api/posts/')
    if (response.ok) {
        const postsList = await response.json();
        // console.log("this is posts list in loadAllPost thunk", postsList)
        dispatch(getAllPosts(postsList))
    }
}

//*************************************************************************** */

// -------------------------  LOAD ONE POST's DETAILS   -------------------------


export const loadOnePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}/`);
    // console.log("DID TI REACH GET ONE POST THUNK")




    if (response.ok){
        const postInfo = await response.json();
        //  console.log("POST INFO IN THUNK", postInfo)
        dispatch(getOnePost(postInfo))
    }
}


//*************************************************************************** */

// -------------------------  CREATE A POST   ----------------------------------

export const createNewPost = (payload) => async dispatch => {
    // console.log("did this reach?")
    // console.log("this is the payload", payload)
    const response = await csrfFetch('/api/posts/new/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    // console.log("did it reach here? after response?")

    if (response.ok) {
        let post = await response.json()
        // console.log("this is the post if response.ok", post)
        dispatch(createPost(post))
        return post
    }
}

//*************************************************************************** */

// -------------------------  EDIT A POST   ----------------------------------

export const editPost = (editPostInfo) => async dispatch => {

    const response = await csrfFetch(`/api/posts/${editPostInfo.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editPostInfo)
    })

    if (response.ok) {
        const editedPost = await response.json();
        dispatch(updatePost(editedPost))
        return editedPost
    }
}

//*************************************************************************** */

// -------------------------  DELETE A POST   --------------------------------
export const deletePost = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${payload.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removePost(payload.id))
        return response
    }
}




// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const postReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALLPOSTS:
            newState = {
                ...state
            }
            action.payload.Posts.forEach((post) => {
                newState[post.id] = post
            });
            return newState
            // *****************************************************************************
            case GET_ONEPOST:
                // newState = {}

                // newState[action.payload.id] = action.payload

                return { ...state, ...action.payload}

            // *****************************************************************************
        case CREATE_POST:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload
            return newState
            // *****************************************************************************
        case UPDATE_POST:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload

            return newState;


            // *****************************************************************************
        case DELETE_POST:
            newState = {
                ...state
            }
            delete newState[action.payload]
            return newState
            // *****************************************************************************
        default:
            return state

    }
}
// *****************************************************************************

export default postReducer
