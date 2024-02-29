import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"
import Sidebar from "../Sidebar"
import Feed from "../Feed";
import { useDispatch, useSelector } from 'react-redux';
import * as postActions from '../../redux/posts'
import TopCommunitiesInfo from "../TopCommunitiesInfo";

const GitHub = () => {
    return(
        <svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.666748" width="38" height="38" rx="19" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M17.3904 0.085288C16.1637 0.234222 15.7519 0.298453 14.9481 0.466016C10.9038 1.30936 6.9091 3.81718 4.25545 7.17873C-3.90315 17.5137 0.159384 32.9703 12.2624 37.6425C14.1286 38.3629 14.3483 38.1109 14.3483 35.2479V33.2989L14.1072 33.3461C13.4299 33.479 11.7569 33.4854 11.0012 33.3581C9.34376 33.0788 8.62873 32.5031 7.82927 30.8036C7.24074 29.5526 6.7978 28.9006 6.24346 28.4691C6.02863 28.302 5.73233 28.0706 5.58493 27.9549C4.99327 27.4908 4.9757 27.1837 5.53612 27.1035C6.69171 26.9378 7.92709 27.7363 8.99123 29.3365C9.86514 30.6507 10.6958 31.1469 12.0112 31.1407C13.168 31.1353 14.4226 30.8134 14.4226 30.5219C14.4226 29.983 14.8627 28.9297 15.3208 28.3722C15.6607 27.9587 15.7041 27.9948 14.7069 27.8618C9.62639 27.1841 7.00493 24.073 6.97568 18.6864C6.96447 16.6304 7.36619 15.3003 8.42881 13.8748C8.87897 13.2708 8.87945 13.2698 8.79331 12.9651C8.35825 11.427 8.4801 9.13137 9.04346 8.2529C9.37718 7.73265 11.679 8.48925 13.7369 9.7956L14.2756 10.1375L14.924 9.97743C17.5406 9.33134 20.5046 9.33134 23.1213 9.97743L23.7697 10.1375L24.3084 9.80007C26.374 8.50584 28.5932 7.72576 28.9483 8.16907C29.5309 8.89608 29.693 11.3681 29.2604 12.9286L29.165 13.2726L29.5927 13.8382C30.7927 15.4248 31.2624 17.3029 31.0497 19.6633C30.6085 24.5616 28.1621 27.1684 23.3631 27.8542C22.3353 28.0011 22.3884 27.9528 22.7517 28.4094C23.5983 29.4732 23.697 30.0574 23.697 34.0074C23.697 38.2475 23.7911 38.4114 25.7829 37.6425C40.9332 31.7939 42.3326 10.2188 28.0731 2.33395C25.0105 0.640468 20.5503 -0.298351 17.3904 0.085288Z" fill="black"/>
        </svg>
    )
}

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let posts = useSelector(state => state.posts)

    let postArr = Object.values(posts)

    useEffect(() => {
        dispatch(postActions.getPosts())
    }, [])

    const redirectToExternalSite = (url) => {
        window.location.href = url;
    }

    return (
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
            <div className="github clickable" onClick={() => redirectToExternalSite("https://github.com/jjlazo/breadit/")}>
                <GitHub/>
            </div>
        </div>
    );
  }
  
  export default Home;
