import React, { useState, useEffect } from "react"
import Sidebar from "../Sidebar";
import Feed from "../Feed";
import SubbreaditInfo from "./SubbreaditInfo";
import OpenModalButton from "../OpenModalButton";
import { PostFormModal } from "../ModalComponents";
import "./Subbreadit.css"

function Subbreadits(){
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => setShowMenu(false);

    return(
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="feed">
                <div className="subbreadit-header">
                    <div className="subbreadit-content">
                    <img onClick={() => navigate("/")} className="subbreadit" src={"https://i.ibb.co/LxDRcz0/Mask-group.png"} alt="Subbreadits"/>
                    b/{"subbreadit"}
                    </div>
                    <div className="subbreadit-divider"></div>
                </div>
                <Feed data={Array(7).fill(true)}/>
            </div>
            <div className="sub-content">
                <div className="sub-content-container">
                    <div className="sub-content-button-container">
                    <OpenModalButton
                    // itemText="toast"
                    onButtonClick={closeMenu}
                    modalComponent={<PostFormModal />}
                    buttonComponent={<button className="sub-content-button">toast</button>}
                    />
                    </div>
                    <SubbreaditInfo/> 
                </div>
            </div>
            </div>
        </div>
    )
}

export default Subbreadits