import React, { useState, useEffect } from "react"
import Sidebar from "../Sidebar"; 
import { useNavigate, useParams } from "react-router-dom";
import { Home, Signpost, MoveUp, MoveDown, Eraser, PencilLine, Reply } from 'lucide-react';
import OpenModalButton from "../OpenModalButton";
import SubbreaditInfo from "./SubbreaditInfo";
import { CommentFormModal, UpdatePostFormModal, UpdateCommentFormModal } from "../ModalComponents";
import { useDispatch, useSelector } from 'react-redux';
import * as postActions from '../../redux/posts'
import "./Subbreadit.css"

function SubbreaditToast(){
    const navigate = useNavigate()
    const { toastId } = useParams()
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()

    let post = useSelector(state => state.posts)

    let postData = Object.values(post)

    console.log(postData)

    useEffect(() => {
        dispatch(postActions.getPostById(toastId))
    }, [toastId])

    const closeMenu = () => setShowMenu(false);

    return(
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="feed">
                <div className="content">
                    <div className="single-toast-bubble">
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
                                    <div onClick={() => navigate(`/subbreadit/${1}`)} className="toast-subbreadit"><b>b/{postData[0]?.subbreadit_name}</b></div>
                                    <div onClick={() => navigate(`/toasts/${1}`)} className="toast-user">posted by {postData[0]?.username}</div>
                                </div>
                            </div>
                            <div className="toast-content">
                                <div className="toast-title">{postData[0]?.title}</div>
                                <div>{postData[0]?.body}</div>
                            </div>
                            <div className="toast-update">
                                <Eraser strokeWidth={"2.05px"} className="toast-update-icon"/>
                                <OpenModalButton
                                // itemText="toast"
                                onButtonClick={closeMenu}
                                modalComponent={<UpdatePostFormModal />}
                                buttonComponent={<PencilLine strokeWidth={"2.05px"} className="toast-update-icon"/>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment-content-container">
                    <div className="comments-info">
                        <OpenModalButton
                            onButtonClick={closeMenu}
                            modalComponent={<CommentFormModal />}
                            buttonComponent={
                                <button className="comments-button">
                                <Reply/>
                                comment
                                </button>
                            }
                            />
                        <div>{postData[0]?.comments.length} {postData[0]?.comments.length == 1 ? 'comment' : "comments"}</div>
                    </div>
                </div>
                <div className="comments-content-container">
                    {postData[0]?.comments.map((comment) => (
                        <div key={comment?.id} className="comment-content">
                            <div className="comment-content-profile">
                                <img className="toast-toast" src={"https://i.ibb.co/1LvSt5B/Mask-group-1.png"} alt=""/>
                                <div className="vertical-line"></div>
                            </div>
                            <div>
                                <div><b>{comment?.username}</b></div>
                                <div>{comment?.body}</div>
                                    <div className="toast-update">
                                        <Eraser strokeWidth={"2.05px"} className="toast-update-icon"/>
                                        <OpenModalButton
                                        onButtonClick={closeMenu}
                                        modalComponent={<UpdateCommentFormModal />}
                                        buttonComponent={<PencilLine strokeWidth={"2.05px"} className="toast-update-icon"/>}
                                        />
                                        <div className="edited">Edited</div>
                                    </div>
                            </div>
                        </div>
                    ))

                    }
                </div>
            </div>
            <div className="sub-content">
                <div className="sub-content-container">
                    <SubbreaditInfo/> 
                </div>
            </div>
            </div>
        </div>
    )
}

export default SubbreaditToast