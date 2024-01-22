import React, { useState, useEffect } from "react"
import "./Subbreadit.css"

function SubbreaditInfo({  }){
    return(
        <div className="sub-content-bubble">
            <div className="sub-content-bubble-header">
                <img onClick={() => navigate("/")} className="bubble-header-subbreadit" src={"https://i.ibb.co/LxDRcz0/Mask-group.png"} alt="Subbreadits"/>
                b/{"subbreadit"}
            </div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            <div className="sub-content-bubble-stats">
                <div className="sub-content-bubble-stats-column">
                    <div className="sub-content-bubble-stats-column-text-md">{"6.5k"}</div>
                    <div className="sub-content-bubble-stats-column-text-sm">Members</div>
                </div>
                <div className="sub-content-bubble-stats-column">
                    <div className="sub-content-bubble-stats-column-text-md">{"229"}</div>
                    <div className="sub-content-bubble-stats-column-text-sm">Online</div>
                </div>
                <div className="sub-content-bubble-stats-column">
                    <div className="sub-content-bubble-stats-column-text-md">Top {"10%"}</div>
                    <div className="sub-content-bubble-stats-column-text-sm">Ranking</div>
                </div>
            </div>
            <button className="subscription-button">{"subscribe"}</button>
        </div>
    )
}

export default SubbreaditInfo