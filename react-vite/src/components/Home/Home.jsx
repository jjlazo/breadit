import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"
import Sidebar from "../Sidebar"
import Feed from "../Feed";
import { useDispatch, useSelector } from 'react-redux';
import * as postActions from '../../redux/posts'
import TopCommunitiesInfo from "../TopCommunitiesInfo";

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let posts = useSelector(state => state.posts)

    let postArr = Object.values(posts)
    console.log(postArr)

    useEffect(() => {
        dispatch(postActions.getPosts())
    }, [])

    return (
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
    );
  }
  
  export default Home;