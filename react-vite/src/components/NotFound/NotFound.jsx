import React, { useState, useEffect } from "react" 
import Sidebar from "../Sidebar"
import TopCommunitiesInfo from "../TopCommunitiesInfo"
import "./NotFound.css"
import { useNavigate, useLocation } from "react-router-dom"

function NotFound({ statusCode, message }){
    const navigate = useNavigate()
    const { state } = useLocation()
    return(
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="not-found-body">
                <img className="toasted" src={"https://i.ibb.co/KwhLWfL/Group-101.png"} alt="Burnt toast"/>
                <div className="not-found-body-content">
                    <div>{state?.statusCode || 404}</div>
                    <div>{state?.message || "Forbidden Request Not Found"}</div>
                    <button onClick={() => navigate("/")} className="return-home-button">Return Home</button>
                </div>
            </div>
            <div className="sub-content">
                <TopCommunitiesInfo/>
            </div>
            </div>
        </div>
    ) 
}

export default NotFound