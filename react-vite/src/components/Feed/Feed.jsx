import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Home, Signpost, MoveUp, MoveDown } from 'lucide-react';
import "./Feed.css"

function Feed({ data }){
    const navigate = useNavigate()

    const navigateToSubbreadit = (e) => {
        e.stopPropagation()
        navigate(`/subbreadit/${1}`)
    }

    const navigateToToasts = (e) => {
        e.stopPropagation()
        navigate(`/toasts/${1}`)
    }

    return(
        <>
        {
            data.map((posts) => (
            <div onClick={() => navigate(`/subbreadit/${1}/toast/${1}`)} className="content">
                <div className="toast-bubble">
                    <div className="upvote">
                        <button className="voting-button">
                        <MoveUp className="arrows"/>
                        </button>
                        0
                        <button className="voting-button">
                        <MoveDown className="arrows"/>
                        </button>
                    </div>
                    <div>
                        <div className="toast-header">
                            <img className="toast-toast" src={"https://i.ibb.co/1LvSt5B/Mask-group-1.png"} alt=""/>
                            <div>
                                <div onClick={(e) => navigateToSubbreadit(e)} className="toast-subbreadit"><b>b/{"subbreadit"}</b></div>
                                <div onClick={(e) => navigateToToasts(e)} className="toast-user">posted by {"username"}</div>
                            </div>
                        </div>
                        <div className="toast-content">
                            <div className="toast-title">Title</div>
                            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>
            ))
        }
        </>
    )
}

export default Feed