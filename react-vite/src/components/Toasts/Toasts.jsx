import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import "./Toasts.css"
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import * as postActions from '../../redux/posts'
import TopCommunitiesInfo from "../TopCommunitiesInfo";
import Feed from "../Feed";

function Toasts(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { toastId } = useParams()

    let posts = useSelector(state => state.posts)

    let postArr = Object.values(posts)

    useEffect(() => {
        dispatch(postActions.getPostsBySpecificUserId(toastId))
    }, [toastId])

    return(
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="feed">
                <Feed data={postArr}/>
            </div>
            <div className="sub-content">
                <TopCommunitiesInfo/>
            </div>
            </div>
        </div>
    )
}

export default Toasts