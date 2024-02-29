import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import * as voteActions from "../../redux/votes"
import { MoveUp, MoveDown } from 'lucide-react';
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

function Feed({ data }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const subscriptions = useSelector((state)=> state.subscriptions);

    let upvotedPosts = useSelector(voteActions.selectUpvotes)
    let downvotedPosts = useSelector(voteActions.selectDownvotes)

    const upvoteToast = (e, id) => {
        e.stopPropagation();
        const upvote = Boolean(upvotedPosts[id]) || data.find(toast => toast.id == id)?.upvotes.includes(user?.id);
        if (!user) {
            alert("sign up or in to upvote toasts!");
        }
        else if (user && upvote) {
            dispatch(voteActions.fetchDeleteUpvote(id, user.id));
        }
        else if (user && !upvote) {
            dispatch(voteActions.fetchCreateUpvote(id, user.id));
        }
    };

    const downvoteToast = (e, id) => {
        e.stopPropagation();
        const downvote = Boolean(downvotedPosts[id]) || data.find(toast => toast.id == id)?.downvotes.includes(user?.id);
        if (!user) {
            alert("sign up or in to downvote toasts!");
        }
        else if (user && downvote) {
            dispatch(voteActions.fetchDeleteDownvote(id, user.id));
        }
        else if (user && !downvote) {
            dispatch(voteActions.fetchCreateDownvote(id, user.id));
        }
    };

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

    if (user) {
        const { subscribed, other } = getUniqueSubscribedPosts(reversedData, Object.values(subscriptions).map((sub )=> sub.id));
        postsToRender = [...subscribed, ...other];
    }

    useEffect(()=>{
        if(user){
        dispatch(getSubscriptions(user.id))
        }
    }, [])


    return(
        <>
            {
                postsToRender?.map((post) => {
                    const didUpvote = Boolean(upvotedPosts[post.id]) || post.upvotes.includes(user?.id);
                    const didDownvote = Boolean(downvotedPosts[post.id]) || post.downvotes.includes(user?.id);
                    return (
                        <div key={post.id} onClick={() => navigate(`/subbreadit/${post.subbreadit_id}/toast/${post.id}`)} className="content">
                            <div className="toast-bubble">
                                <div className="upvote">
                                    <button className={`voting-button ${didUpvote ? "filled-up" : ""}`} type="button" onClick={(e) => upvoteToast(e, post?.id)}>
                                        <MoveUp className="arrows" />
                                    </button>
                                    {(() => {
                                        const upvote = upvotedPosts[post.id];
                                        const downvote = downvotedPosts[post.id];
                                        let votes = 0;
                                        if (upvote) {
                                            votes = upvotedPosts[post?.id]?.upvotes?.length - upvotedPosts[post?.id]?.downvotes?.length
                                        }
                                        else if (downvote) {
                                            votes = downvotedPosts[post?.id]?.upvotes?.length - downvotedPosts[post?.id]?.downvotes?.length
                                        }
                                        else {
                                            votes = post.upvotes.length - post.downvotes.length
                                        }
                                        return votes;
                                    })()}
                                    <button className={`voting-button ${didDownvote ? "filled-down" : ""}`} type="button" onClick={(e) => downvoteToast(e, post.id)}>
                                        <MoveDown className="arrows" />
                                    </button>
                                </div>
                                <div className="toast-container">
                                    <div className="toast-header">
                                        <img className="toast-toast" src={"https://i.ibb.co/1LvSt5B/Mask-group-1.png"} alt="" />
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
                    )
                })
            }
            {!data.length &&
                <div className="no-toasts">
                    <img className="toaster" src={"https://i.ibb.co/52Stt4B/Group-101-1.png"} alt="toaster" />
                    <div className="toast-text"><b>No toasts found!</b></div>
                </div>
            }
        </>
    )
}

export default Feed
