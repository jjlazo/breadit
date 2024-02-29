import React, { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Toasts.css"
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import * as postActions from '../../redux/posts'
import TopCommunitiesInfo from "../TopCommunitiesInfo";
import Feed from "../Feed";

function Toasts(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const { state } = useLocation()
    const { userId } = useParams()

    let posts = useSelector(state => state.posts)

    let postArr = Object.values(posts).filter((post) => post.user_id == userId)

    // useEffect(() => {
    //     async function wrapperFn(){
    //         const response = await dispatch(postActions.getPostsBySpecificUserId(userId))
    //         if(response?.errors){
    //             navigate('/errors', {state: {"statusCode": 404, "message": response.errors.message}})
    //         } 
    //     }

    //     wrapperFn()
    // }, [userId])

    useEffect(() => {
        async function wrapperFn(){
            const response = await fetch(`/api/users/${userId}`)

            if(response.ok){
                const user = await response.json()
                setUsername(user?.username)
            }
        }
        wrapperFn()
    }, [userId])

    return(
        <div className="home-container">
            <div className="container-content">
            <Sidebar/>
            <div className="feed">
                <div className="subbreadit-header">
                    <div className="subbreadit-content">
                    <img onClick={() => navigate("/")} className="subbreadit" src={"https://i.ibb.co/LxDRcz0/Mask-group.png"} alt="Subbreadits"/>
                    u/{postArr[0]?.username || state?.username || username} 
                    </div>
                    <div className="subbreadit-divider"></div>
                </div>
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