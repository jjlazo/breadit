import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Home, Signpost, MoveUp, MoveDown } from 'lucide-react';
import "./Home.css"
import Sidebar from "../Sidebar";
import Feed from "../Feed";

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
                <div className="sub-content-bubble">
                    <div className="bubble-header">Top Communities</div>
                    <div className="bubble-content">
                       {Array(6).fill(true).map((communities) => (
                            <div onClick={() => navigate(`/subbreadit/${1}`)} className="bubble-subbreadits">
                                <img className="bubble-toast" src={"https://i.ibb.co/1LvSt5B/Mask-group-1.png"} alt=""/>
                                <div>
                                    <div>b/{"subbreadit"}</div>
                                    <div className="sub-count">1535 subscribers</div>
                                </div>
                            </div>
                       ))

                       }
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
  }
  
  export default HomeComponent;