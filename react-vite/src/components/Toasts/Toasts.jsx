import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Toasts.css"
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import * as postActions from '../../redux/posts'
import TopCommunitiesInfo from "../TopCommunitiesInfo";
import Feed from "../Feed";

function Toasts(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let posts = useSelector(state => state.posts)

    let postArr = Object.values(posts)

    useEffect(() => {
        dispatch(postActions.getPostsByUserId())
    }, [])

    return(
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="feed">
                <Feed data={postArr}/>
            </div>
            <div className="sub-content">
                <TopCommunitiesInfo data={Array(6).fill(true)}/>
            </div>
            </div>
        </div>
    )
}

export default Toasts