import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Home, Signpost, MoveUp, MoveDown } from 'lucide-react';
import "./Home.css"
import Sidebar from "../Sidebar";
import Feed from "../Feed";
import TopCommunitiesInfo from "../TopCommunitiesInfo";

function HomeComponent() {
    const navigate = useNavigate()
    return (
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="feed">
                <Feed data={Array(7).fill(true)}/>
            </div>
            <div className="sub-content">
                <TopCommunitiesInfo data={Array(6).fill(true)}/>
            </div>
            </div>
        </div>
    );
  }
  
  export default HomeComponent;