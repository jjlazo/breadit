import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Home, Signpost, MoveUp, MoveDown } from 'lucide-react';
import "./Feed.css"
import { useSelector, useDispatch } from 'react-redux';
import { getSubscriptions } from '../../redux/subscriptions'

const getUniqueSubscribedPosts = (posts, subscriptions) => {
    const subscribed = [];
    const other = [];

    // Separate posts based on subscriptions
    posts.forEach((post) => {
        if (subscriptions.includes(post.subbreadit_id)) {
            subscribed.push(post);
        } else {
            other.push(post);
        }
    });

    return { subscribed, other };
};

function Feed({ data }){
    const navigate = useNavigate()
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const subscriptions = useSelector((state)=> state.subscriptions);

    const navigateToSubbreadit = (e, subbreaditId) => {
        e.stopPropagation()
        navigate(`/subbreadit/${subbreaditId}`)
    }

    const navigateToToasts = (e, toastId) => {
        e.stopPropagation()
        navigate(`/toasts/${toastId}`)
    }

    const reversedData = data.sort((a,b) => b.id-a.id)

    let postsToRender = reversedData;

    if (sessionUser) {
        const { subscribed, other } = getUniqueSubscribedPosts(reversedData, Object.values(subscriptions).map((sub )=> sub.id));
        postsToRender = [...subscribed, ...other];
    }

    useEffect(()=>{
        if(sessionUser){
        dispatch(getSubscriptions(sessionUser.id))
        }
    }, [])

    return(
        <>
        {
            postsToRender.map((post) => (
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
                    <div className="toast-container">
                        <div className="toast-header">
                            <img className="toast-toast" src={"https://i.ibb.co/1LvSt5B/Mask-group-1.png"} alt=""/>
                            <div>
                                <div onClick={(e) => navigateToSubbreadit(e, post.subbreadit_id)} className="toast-subbreadit"><b>b/{post.subbreadit_name}</b></div>
                                <div onClick={(e) => navigateToToasts(e, post.user_id)} className="toast-user">posted by {post.username}</div>
                            </div>
                        </div>
                        <div className="toast-content">
                            <div className="toast-title">{post.title}</div>
                            <div className="toast-body">{post.body}</div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>
            ))
        }
        {!data.length &&
        <div className="no-toasts">
            <img className="toaster" src={"https://i.ibb.co/52Stt4B/Group-101-1.png"} alt="toaster"/>
            <div className="toast-text"><b>No toasts found!</b></div>
        </div>
        }
        </>
    )
}

export default Feed