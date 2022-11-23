import React from "react";
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import "./DemoUser.css"

function DemoUser(){
    const dispatch = useDispatch();
    const history = useHistory()

    const handleDemoUser = async (e) => {
        e.preventDefault();
        let demo
        demo = await dispatch(sessionActions.login(
            { email: 'demo@aa.io',
              password: "password" })).then(()=> history.push("/homepage"))
    }
    return(
        <button className="Demo-Button" onClick={handleDemoUser}>Demo User</button>
    )
}


export default DemoUser
