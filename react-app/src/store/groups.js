// store > groups.js

import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************


///*************************************************************************** */
const GET_ALLGROUPS = 'groups/getAllGroupss'
const CREATE_GROUP = 'groups/createGroup'
const DELETE_GROUP = 'groups/removeGroup'


///*************************************************************************** */
// **** GET ALL LIKES ****
const getAllGroups = group => ({
    type: GET_ALLGROUPS,
    payload: group
})

///*************************************************************************** */
// **** CREATE A COMMENT ****

const createGroup = group => ({
    type: CREATE_GROUP,
    payload: group
})
///*************************************************************************** */

// **** DELETE A LIKE ****

const removeGroup = groupId => ({
    type: DELETE_GROUP,
    payload: groupId
})

// *****************************************************************************
//************************************ THUNKS **********************************


// -------------------------  LOAD ALL LIKES  ----------------------------------
export const loadAllGroups = () => async dispatch => {
    console.log("did this get to the loadAll Groups thunk")
    const response = await csrfFetch('/api/groups/')
    if (response.ok) {
        const groupsList = await response.json();
        console.log("this is comments list and it reached here", groupsList)
        dispatch(getAllGroups(groupsList))
    }
}

//*************************************************************************** */

// -------------------------  CREATE A GROUP   ----------------------------------

export const createNewLike = (payload) => async dispatch => {
    // console.log("did this reach?")
    const response = await csrfFetch(`/api/groups/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log("did it reach here after respobnse group?")

    if (response.ok) {
        let group = await response.json()
        // console.log("this is the comment if response.ok", comment)
        dispatch(createGroup(group))
        return group
    }
}

//*************************************************************************** */

//*************************************************************************** */

// -------------------------  DELETE A LIKE  --------------------------------
export const deleteLike = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${payload.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removeGroup(payload.id))
        return response
    }
}


// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const groupsReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALLGROUPS:
            newState = {
                ...state
            }
            action.payload.Groups.forEach((group) => {
                newState[group.id] = group
            });
            return newState
    // *****************************************************************************

        case CREATE_GROUP:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload
            return newState
            // *****************************************************************************

            // *****************************************************************************
        case DELETE_GROUP:
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

export default groupsReducer
