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
    post
})
///*************************************************************************** */
// **** EDIT/UPDATE A POST ****

const updatePost = post => ({
    type: UPDATE_POST,
    post
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


//*******************************  CREATE A POST NO AWS   ************************************** */

export const createNewPostNoImage = (payload) => async dispatch => {
    // console.log("did this reach?")
    // console.log("this is the payload", payload)
    const response = await csrfFetch('/api/posts/new/noimage', {
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




// -------------------------  CREATE A POST AWS   ----------------------------------
// when uploading to aws, note that you must NOT set the Content-Type header on your request.
//If you leave the Content-Type field blank, the Content-Type will be generated and set correctly by your browser
// (check it out in the network tab!). If you include Content-Type, your request will be missing information and your Flask backend will be unable to locate the attached files.
export const createNewPost = (formData) => async dispatch => {
    console.log("did this reach to createNewPOst in the STORE?")
    // console.log("this is the formData", formData)
    const response = await fetch('/api/posts/new', {
        method: "POST",
        body: formData

    }).catch(res=>res)
    if(response.ok){
        const newImage = await response.json()
        await dispatch(createPost(newImage))
        return newImage
    }else {
        const result = await response.json()
        return result
    }
}

//*************************************************************************** */

// -------------------------  EDIT A POST NO AWS  ----------------------------------

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

// -------------------------  EDIT A POST AWS  ----------------------------------

export const editPostAWS = (formData, postId) => async dispatch => {
    console.log("did this reach to EDITPOST AWS in THE STORE")
    // console.log("this is the formData", formData)
    const response = await fetch(`/api/posts/${postId}/update-image`, {
        method: "POST",
        body: formData

    }).catch(res=>res)
    if(response.ok){
        const newImage = await response.json()
        await dispatch(updatePost(newImage))
        return newImage
    }else {
        const result = await response.json()
        return result
    }
}



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

// -------------------------  UPLOAD IMAGE TO AWS  --------------------------------
// export const uploadImage = (payload) => async dispatch => {
//     const response = await csrfFetch(`/api/posts/upload-image/`, {
//         method: 'POST',
//         body: payload

//     }).catch(res=>res)
//     if(response.ok){
//         const newImage = await response.json()
//         await dispatch(createNewPost(newImage))
//         return newImage
//     }else {
//         const result = await response.json()
//         return result
//     }
// }


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
            newState[action.post.id] = action.post
            return newState
            // *****************************************************************************
        case UPDATE_POST:
            newState = {
                ...state
            }
            newState[action.post.id] = action.post

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
