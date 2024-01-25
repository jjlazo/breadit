import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import * as subbreaditActions from '../../redux/subbreadits'

function TopCommunitiesInfo(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let subbreadits = useSelector(state => state.subbreadits)

    const subbreaditData = Object.values(subbreadits)

    useEffect(() => {
        dispatch(subbreaditActions.getSubbreadits())
    }, [])

    return(
        <div className="sub-content-bubble">
            <div className="bubble-header">Top Communities</div>
            <div className="bubble-content">
                {subbreaditData.slice(0, 6).map((communities) => (
                    <div key={communities.id} onClick={() => navigate(`/subbreadit/${communities.id}`)} className="bubble-subbreadits">
                        <img className="bubble-toast" src={"https://i.ibb.co/1LvSt5B/Mask-group-1.png"} alt=""/>
                        <div>
                            <div>b/{communities.name}</div>
                            <div className="sub-count">1539 subscribers</div>
                        </div>
                    </div>
                ))

                }
            </div>
        </div>
    )
}

export default TopCommunitiesInfo