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

    const handleUnauth  = () => {
        setModalContent(<LoginFormModal/>);
    }

    const upvoteToast = (e, id) => {
        e.stopPropagation();

        if (!sessionUser) {
            handleUnauth()
        }
        else if (post?.upvotes.includes(sessionUser.id)) {
            dispatch(voteActions.fetchDeleteUpvote(id, sessionUser?.id));
        }
        else {
            dispatch(voteActions.fetchCreateUpvote(id, sessionUser?.id));
        }
    };

    const downvoteToast = (e, id) => {
        e.stopPropagation();

        if (!sessionUser) {
            handleUnauth()
        }
        else if (post?.downvotes.includes(sessionUser.id)) {
            dispatch(voteActions.fetchDeleteDownvote(id, sessionUser?.id));
        }
        else {
            dispatch(voteActions.fetchCreateDownvote(id, sessionUser?.id));
        }
    };

    return(
        <div className="upvote">
            <button className={`voting-button ${post?.upvotes.includes(sessionUser?.id) ? "filled-up" : ""}`} onClick={(e) => upvoteToast(e, post?.id)}>
                <MoveUp className="arrows" />
            </button>
            {post ? post?.upvotes.length - post?.downvotes.length : 0}
            <button className={`voting-button ${post?.downvotes.includes(sessionUser?.id) ? "filled-down" : ""}`} onClick={(e) => downvoteToast(e, post?.id)}>
                <MoveDown className="arrows" />
            </button>
        </div>
    )
}

export default Votes
