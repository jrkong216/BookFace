import{NavLink} from "react-router-dom"
import {useDispatch } from 'react-redux';
import EditGroupModal from "../EditGroupModal"
import {loadAllGroups, deleteGroup} from "../../store/groups"
import "./GroupCard.css"


function GroupCard({group, sessionUser}) {
    const dispatch = useDispatch()
    console.log("this is group&&&&&&&&&&&&&&&****************************", group)
    const deleteGroupHandler = async (id) => {


            const payload = {
                id: id
            }

            let groupToDelete;
            groupToDelete = await dispatch(deleteGroup(payload)).then(()=>dispatch(loadAllGroups()))

      }

return(
    <>
    <div className="each-group-container">
<NavLink className="group-link-container" to={`/groups/${group.id}`}>
    <div className= "group-container">
        <div className= "spot-name-container">
             <div className ="group"/> {group.name}</div>
    </div>

</NavLink>
<EditGroupModal item={group} sessionUser={sessionUser}/>
<div className="comment-delete-button-container">
    {sessionUser && sessionUser.id === group.owner_id ?<button className="fa fa-trash" id="trashcan" onClick= {() => deleteGroupHandler(group.id, group.user_id)}></button>:null }

</div>
</div>
</>
)


}

export default GroupCard
