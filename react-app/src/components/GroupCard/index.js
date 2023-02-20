import{NavLink} from "react-router-dom"
import "./GroupCard.css"


function GroupCard({group}) {



return(
<NavLink className="group-link-container" to={`/groups/${group.id}`}>
    <div className= "group-container">
        <div className= "spot-name-container">
             <div className ="group"/> {group.name}</div>
    </div>
</NavLink>
)


}

export default GroupCard
