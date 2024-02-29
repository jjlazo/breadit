import React, { useState, useEffect, useMemo } from "react"
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { MoveUp, MoveDown, Eraser, PencilLine, Reply, Flag } from 'lucide-react';
import OpenModalButton from "../OpenModalButton";
import SubbreaditInfo from "./SubbreaditInfo";
import { CommentFormModal, UpdatePostFormModal, UpdateCommentFormModal } from "../ModalComponents";
import { useDispatch, useSelector } from 'react-redux';
import * as postActions from '../../redux/posts'
// import * as subbreaditActions from '../../redux/subbreadits'
import * as commentActions from '../../redux/comments'
import * as voteActions from '../../redux/votes'
import "./Subbreadit.css"

function SubbreaditToast(){
    const navigate = useNavigate()
    const { subbreaditId, toastId } = useParams()
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    let post = useSelector(state => state.posts)
    let comments = useSelector(state => state.comments)

    let postData = Object.values(post)
    let commentData = Object.values(comments)

    let upvotedPosts = useSelector(voteActions.selectUpvotes)
    let downvotedPosts = useSelector(voteActions.selectDownvotes)

    const upvote = useMemo(()=> {
        return upvotedPosts.hasOwnProperty(toastId)
    }, [upvotedPosts, toastId]);

    const downvote = useMemo(()=> {
        return downvotedPosts.hasOwnProperty(toastId)
    }, [downvotedPosts, toastId]);

    const deletePost = (e) => {
        e.preventDefault()
        dispatch(postActions.deletePost(toastId))
        navigate(`/u/toasts/${sessionUser?.id}`)
    }

    const deleteComment = (e, commentId) => {
        e.preventDefault()
        dispatch(commentActions.deleteComment(commentId))
    }

    const upvoteToast = (e, id) => {
        e.stopPropagation();

        if (!sessionUser) {
            alert("sign up or in to upvote toasts!");
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
            alert("sign up or in to downvote toasts!");
        }
        else if (sessionUser && downvote) {
            dispatch(voteActions.fetchDeleteDownvote(id, sessionUser?.id));
        }
        else if (sessionUser && !downvote) {
            dispatch(voteActions.fetchCreateDownvote(id, sessionUser?.id));
        }
    };

    useEffect(() => {
        async function wrapperFn(){
            const response = await dispatch(postActions.getPostById(toastId))
            if(response.errors){
                navigate('/errors', {state: {"statusCode": 404, "message": response.errors.message}})
            }
        }
        wrapperFn()
        dispatch(commentActions.getComments(toastId))
        if (sessionUser) {
            dispatch(voteActions.fetchDownvotes(sessionUser?.id))
            dispatch(voteActions.fetchUpvotes(sessionUser?.id))
        }
    }, [toastId, downvote, upvote])

    const closeMenu = () => setShowMenu(false);

    function setDefaultImage() {
        const toastImage = document.getElementById("toast-image");
        toastImage.src = "https://i.ibb.co/KwhLWfL/Group-101.png";
        toastImage.style.width = "100px";
        toastImage.style.height = "100px";
    }

    return(
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="feed">
                <div className="content">
                    <div className="single-toast-bubble">
                        {postData[0]?.moderator == sessionUser?.id && <div className="moderator">
                            You're a moderator
                            <Flag className="mod-flag"/>
                        </div>}
                        <div className="upvote">
                            <button className={`voting-button ${upvote ? "filled-up" : ""}`} onClick={(e)=> upvoteToast(e, postData[0]?.id)}>
                            <MoveUp className="arrows"/>
                            </button>
                            {postData[0] ? postData[0]?.upvotes.length - postData[0]?.downvotes.length : 0}
                            <button className={`voting-button ${downvote ? "filled-down" : ""}`} onClick={(e)=> downvoteToast(e, postData[0]?.id)}>
                            <MoveDown className="arrows"/>
                            </button>
                        </div>
                        <div className="toast-container">
                            <div className="toast-header">
                                <img className="toast-toast" src={"https://i.ibb.co/1LvSt5B/Mask-group-1.png"} alt=""/>
                                <div>
                                    <div onClick={() => navigate(`/subbreadit/${postData[0]?.subbreadit_id}`)} className="toast-subbreadit"><b>b/{postData[0]?.subbreadit_name}</b></div>
                                    <div onClick={() => navigate(`/toasts/${postData[0]?.user_id}`)} className="toast-user">posted by {postData[0]?.username}</div>
                                </div>
                            </div>
                            <div className="toast-content">
                                <div className="toast-title">{postData[0]?.title}</div>
                                <div className="toast-body">{postData[0]?.body}</div>
                            </div>
                            {postData[0]?.image_url && <div className="toast-image-container">
                                <img id="toast-image" className="toast-image" src={postData[0]?.image_url} onError={setDefaultImage} alt="Breadit image"/>
                            </div>}
                            <div className="toast-update">
                                {(sessionUser?.id == postData[0]?.user_id || postData[0]?.moderator == sessionUser?.id) && <Eraser onClick={deletePost} strokeWidth={"2.05px"} className="toast-update-icon"/>}
                                {sessionUser?.id == postData[0]?.user_id && <OpenModalButton
                                // itemText="toast"
                                onButtonClick={closeMenu}
                                modalComponent={<UpdatePostFormModal defaultTitle={postData[0]?.title} defaultBody={postData[0]?.body} />}
                                buttonComponent={<PencilLine strokeWidth={"2.05px"} className="toast-update-icon"/>}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment-content-container">
                    <div className="comments-info">
                        {sessionUser?.id && <OpenModalButton
                            onButtonClick={closeMenu}
                            modalComponent={<CommentFormModal />}
                            buttonComponent={
                                <button className="comments-button">
                                <Reply/>
                                comment
                                </button>
                            }
                            />}
                        <div>{commentData.length} {commentData.length == 1 ? 'comment' : "comments"}</div>
                    </div>
                </div>
                <div className="comments-content-container">
                    {commentData.map((comment) => (
                        <div key={comment?.id} className="comment-content">
                            <div className="comment-content-profile">
                                <img className="toast-toast" src={"https://i.ibb.co/1LvSt5B/Mask-group-1.png"} alt=""/>
                                <div className="vertical-line"></div>
                            </div>
                            <div>
                                <div className="clickable" onClick={() => navigate(`/toasts/${comment?.user_id}`, {state: { username: comment?.username }})}><b>{comment?.username}</b></div>
                                <div>{comment?.body}</div>
                                    <div className="toast-update">
                                        {(sessionUser?.id == comment?.user_id || postData[0]?.moderator == sessionUser?.id) && <Eraser onClick={(e) => deleteComment(e, comment.id)} strokeWidth={"2.05px"} className="toast-update-icon"/>}
                                        {sessionUser?.id == comment?.user_id && <OpenModalButton
                                        onButtonClick={closeMenu}
                                        modalComponent={<UpdateCommentFormModal commentId={comment?.id} defaultBody={comment?.body} />}
                                        buttonComponent={<PencilLine strokeWidth={"2.05px"} className="toast-update-icon"/>}
                                        />}
                                        {comment?.created_at != comment?.updated_at && <div className="edited">Edited</div>}
                                    </div>
                            </div>
                        </div>
                    ))

                    }
                </div>
            </div>
            <div className="sub-content">
                <div className="sub-content-container">
                    <SubbreaditInfo subbreaditId={subbreaditId}/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SubbreaditToast
