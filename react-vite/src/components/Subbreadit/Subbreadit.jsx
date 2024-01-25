import React, { useState, useEffect } from "react"
import Sidebar from "../Sidebar";
import Feed from "../Feed";
import SubbreaditInfo from "./SubbreaditInfo";
import OpenModalButton from "../OpenModalButton";
import { PostFormModal } from "../ModalComponents";
import * as postActions from '../../redux/posts'
import * as subbreaditActions from '../../redux/subbreadits'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Subbreadit.css"

function Subbreadits(){
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const { subbreaditId } = useParams()
    let posts = useSelector(state => state.posts)

    let postArr = Object.values(posts)

    let subbreadits = useSelector(state => state.subbreadits)
    
    const subbreaditData = subbreadits[subbreaditId]
 
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
       dispatch(postActions.getSubbreaditPosts(subbreaditId))
       dispatch(subbreaditActions.getSubbreadits())
    }, [subbreaditId]) 

    return(
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="feed">
                <div className="subbreadit-header">
                    <div className="subbreadit-content">
                    <img onClick={() => navigate("/")} className="subbreadit" src={"https://i.ibb.co/LxDRcz0/Mask-group.png"} alt="Subbreadits"/>
                    b/{subbreaditData?.name}
                    </div>
                    <div className="subbreadit-divider"></div>
                </div>
                <Feed data={postArr}/>
            </div>
            <div className="sub-content">
                <div className="sub-content-container">
                    <div className="sub-content-button-container">
                    <OpenModalButton
                    // itemText="toast"
                    onButtonClick={closeMenu}
                    modalComponent={<PostFormModal subbreaditId={ subbreaditId } />}
                    buttonComponent={<button className="sub-content-button">toast</button>}
                    />
                    </div>
                    <SubbreaditInfo subbreaditId={subbreaditId}/> 
                </div>
            </div>
            </div>
        </div>
    )
}

export default Subbreadits