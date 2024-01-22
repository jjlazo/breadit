import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Home, Signpost, MoveUp, MoveDown } from 'lucide-react';
import "./Toasts.css"
import Sidebar from "../Sidebar";
import TopCommunitiesInfo from "../TopCommunitiesInfo";
import Feed from "../Feed";

function Toasts({  }){
    return(
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="feed">
                <Feed data={Array(2).fill(true)}/>
            </div>
            <div className="sub-content">
                <TopCommunitiesInfo data={Array(6).fill(true)}/>
            </div>
            </div>
        </div>
    )
}

export default Toasts