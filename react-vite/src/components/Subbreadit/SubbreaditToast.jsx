import React, { useState, useEffect } from "react"
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { Home, Signpost, MoveUp, MoveDown, Eraser, PencilLine, Reply } from 'lucide-react';
import Feed from "../Feed";
import OpenModalButton from "../OpenModalButton";
import SubbreaditInfo from "./SubbreaditInfo";
import { CommentFormModal, UpdatePostFormModal, UpdateCommentFormModal } from "../ModalComponents";
import "./Subbreadit.css"

function SubbreaditToast(){
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);

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
                                    <div onClick={() => navigate(`/subbreadit/${1}`)} className="toast-subbreadit"><b>b/{"subbreadit"}</b></div>
                                    <div onClick={() => navigate(`/toasts/${1}`)} className="toast-user">posted by {"username"}</div>
                                </div>
                            </div>
                            <div className="toast-content">
                                <div className="toast-title">Title</div>
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
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
                        <div>{"2"} comments</div>
                    </div>
                </div>
                <div className="comments-content-container">
                    {Array(2).fill(true).map((comment) => (
                        <div className="comment-content">
                            <div className="comment-content-profile">
                                <img className="toast-toast" src={"https://i.ibb.co/1LvSt5B/Mask-group-1.png"} alt=""/>
                                <div className="vertical-line"></div>
                            </div>
                            <div>
                                <div><b>username</b></div>
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
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