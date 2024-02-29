import React, { useState, useEffect, useMemo } from "react"
import { MoveUp, MoveDown, Eraser, PencilLine, Reply, Flag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from '../../context/Modal';
import * as voteActions from '../../redux/votes'
import './Votes.css'
import LoginFormModal from "../LoginFormModal";

function Votes({ post }){
    const sessionUser = useSelector((state) => state.session.user)
    const { setModalContent, setOnModalClose } = useModal();
    const dispatch = useDispatch()

    let upvotedPosts = useSelector(voteActions.selectUpvotes)
    let downvotedPosts = useSelector(voteActions.selectDownvotes)

    const upvote = useMemo(() => {
        return upvotedPosts.hasOwnProperty(post?.id)
    }, [upvotedPosts, post?.id]);

    const downvote = useMemo(() => {
        return downvotedPosts.hasOwnProperty(post?.id)
    }, [downvotedPosts, post?.id]);

    const handleUnauth  = () => {
        setModalContent(<LoginFormModal/>);
    }

    const upvoteToast = (e, id) => {
        e.stopPropagation();

        if (!sessionUser) {
            // alert("sign up or in to upvote toasts!");
            handleUnauth()
        }
        else if (sessionUser && upvote) {
            dispatch(voteActions.fetchDeleteUpvote(id, sessionUser?.id));
        }
        else if (sessionUser && !upvote) {
            dispatch(voteActions.fetchCreateUpvote(id, sessionUser?.id));
        }
    };

    const downvoteToast = (e, id) => {
        e.stopPropagation();

        if (!sessionUser) {
            // alert("sign up or in to downvote toasts!");
            handleUnauth()
        }
        else if (sessionUser && downvote) {
            dispatch(voteActions.fetchDeleteDownvote(id, sessionUser?.id));
        }
        else if (sessionUser && !downvote) {
            dispatch(voteActions.fetchCreateDownvote(id, sessionUser?.id));
        }
    };

    return(
        <div className="upvote">
            <button className={`voting-button ${upvote ? "filled-up" : ""}`} onClick={(e) => upvoteToast(e, post?.id)}>
                <MoveUp className="arrows" />
            </button>
            {post ? post?.upvotes.length - post?.downvotes.length : 0}
            <button className={`voting-button ${downvote ? "filled-down" : ""}`} onClick={(e) => downvoteToast(e, post?.id)}>
                <MoveDown className="arrows" />
            </button>
        </div>
    )
}

export default Votes

