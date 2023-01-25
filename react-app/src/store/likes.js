// store > comments.js

import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************


///*************************************************************************** */
const GET_ALLLIKES = 'comments/getAllLikes'
const CREATE_LIKE = 'comments/createLike'
const DELETE_LIKE = 'comments/removeLike'


///*************************************************************************** */
// **** GET ALL LIKES ****
const getAllLikes = like => ({
    type: GET_ALLLIKES,
    payload: like
})

///*************************************************************************** */
// **** CREATE A COMMENT ****

const createLike = like => ({
    type: CREATE_LIKE,
    payload: like
})
///*************************************************************************** */

// **** DELETE A LIKE ****

const removeLike = likeId => ({
    type: DELETE_LIKE,
    payload: likeId
})

// *****************************************************************************
//************************************ THUNKS **********************************


// -------------------------  LOAD ALL LIKES  ----------------------------------
export const loadAllLikes = () => async dispatch => {
    console.log("did this get to the loadAll Likes thunk")
    const response = await csrfFetch('/api/likes/')
    if (response.ok) {
        const likesList = await response.json();
        console.log("this is comments list and it reached here", likesList)
        dispatch(getAllLikes(likesList))
    }
}

//*************************************************************************** */

// -------------------------  CREATE A LIKE   ----------------------------------

export const createNewLike = (post_id,user_id,payload) => async dispatch => {
    // console.log("did this reach?")
    console.log("this is the payload", payload)
    console.log("this is likeId", post_id)
    console.log("this is sessionUserId", user_id)
    const response = await csrfFetch(`/api/posts/${post_id}/${user_id}/likes/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log("did it reach here? after response?")

    if (response.ok) {
        let like = await response.json()
        // console.log("this is the comment if response.ok", comment)
        dispatch(createLike(like))
        return like
    }
}

//*************************************************************************** */

//*************************************************************************** */

// -------------------------  DELETE A LIKE  --------------------------------
export const deleteLike = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${payload.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removeLike(payload.id))
        return response
    }
}


// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const likesReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALLLIKES:
            newState = {
                ...state
            }
            action.payload.Likes.forEach((like) => {
                newState[like.id] = like
            });
            return newState
    // *****************************************************************************

        case CREATE_LIKE:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload
            return newState
            // *****************************************************************************

            // *****************************************************************************
        case DELETE_LIKE:
            newState = {
                ...state
            }
            delete newState[action.payload]
            return newState
            // *****************************************************************************
        // case CLEAR_COMMENTS:
        //     return {}
            // *****************************************************************************
            default:
            return state

    }
}
// *****************************************************************************

export default likesReducer
