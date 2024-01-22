import React, { useState, useEffect } from "react"
import Sidebar from "../Sidebar";
import Feed from "../Feed";
import SubbreaditInfo from "./SubbreaditInfo";
import "./Subbreadit.css"

function Subbreadits(){
    return(
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="feed">
                <div className="subbreadit-header">
                    <div className="subbreadit-content">
                    <img onClick={() => navigate("/")} className="subbreadit" src={"https://i.ibb.co/LxDRcz0/Mask-group.png"} alt="Subbreadits"/>
                    b/{"subbreadit"}
                    </div>
                    <div className="subbreadit-divider"></div>
                </div>
                <Feed data={Array(7).fill(true)}/>
            </div>
            <div className="sub-content">
                <div className="sub-content-container">
                    <button className="sub-content-button">toast</button>
                    <SubbreaditInfo/> 
                </div>
            </div>
            </div>
        </div>
    )
}

export default Subbreadits