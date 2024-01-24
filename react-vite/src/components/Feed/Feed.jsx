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
            data.map((post) => (
            <div key={post.id} onClick={() => navigate(`/subbreadit/${post.subbreadit_id}/toast/${post.id}`)} className="content">
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
                                <div onClick={(e) => navigateToSubbreadit(e)} className="toast-subbreadit"><b>b/{post.subbreadit_name}</b></div>
                                <div onClick={(e) => navigateToToasts(e)} className="toast-user">posted by {post.username}</div>
                            </div>
                        </div>
                        <div className="toast-content">
                            <div className="toast-title">{post.title}</div>
                            <div>{post.body}</div>
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