import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {loadAllGroups} from "../../store/groups"
import GroupCard from "../GroupCard"
import CreateAGroup from '../CreateAGroup';
import EditGroupModal from '../EditGroupModal';


const GetAllPosts = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)
    // console.log("this is sessionUser IN HOME PAGE", sessionUser)
    useEffect(() => {
        dispatch(loadAllGroups())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const allGroups = useSelector(state =>state.groups)
    console.log("this is allgrous", allGroups)
    const allGroupsArray = Object.values(allGroups)

    if (!isLoaded){
    return (<div>Loading...</div>)
    }

    return (
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
                    <div className="tab-map">
                        {allGroupsArray.map((group)=> {
                            return (

                            <GroupCard key={group.id} group={group} sessionUser={sessionUser}/>)

                            })}
                    </div>
                    <div className="edit-group">
                        {/* <EditGroupModal/> */}
                    </div>
                    <div className="delete-group">

                    </div>
                </div>
                <div>
                    <CreateAGroup/>
                </div>
            </div>

    )
}

export default GetAllPosts
