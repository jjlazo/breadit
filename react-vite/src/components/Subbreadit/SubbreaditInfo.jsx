import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import * as subbreaditActions from '../../redux/subbreadits'
import * as subscriptionActions from '../../redux/subscriptions'
import { useNavigate, useParams } from "react-router-dom";
import "./Subbreadit.css"

function SubbreaditInfo({ subbreaditId }){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessionUser = useSelector(state => state.session.user)
    let subbreadits = useSelector(state => state.subbreadits)
    let subscriptions = useSelector(state => state.subscriptions)
    const [isSubbed, setIsSubbed] = useState(subscriptions.hasOwnProperty(subbreaditId) || sessionUser.subscriptions.includes(Number(subbreaditId))) 
    
    const subbreaditData = subbreadits[subbreaditId]

    const handleSub = () => {
        if(isSubbed){
            dispatch(subscriptionActions.deleteSubscription(subbreaditId))
        }else{
            dispatch(subscriptionActions.addSubscription(subbreaditId))
        }
        setIsSubbed(!isSubbed)
    }

    useEffect(() => {
        dispatch(subbreaditActions.getSubbreadits())
    }, [subscriptions])

    return(
        <div className="sub-content-bubble">
            <div className="sub-content-bubble-header">
                <img onClick={() => navigate("/")} className="bubble-header-subbreadit" src={"https://i.ibb.co/LxDRcz0/Mask-group.png"} alt="Subbreadits"/>
                b/{subbreaditData?.name}
            </div>
            <div>{subbreaditData?.description}</div>
            <div className="sub-content-bubble-stats">
                <div className="sub-content-bubble-stats-column">
                    <div className="sub-content-bubble-stats-column-text-md">{subbreaditData?.subscribers.length}</div>
                    <div className="sub-content-bubble-stats-column-text-sm">Members</div>
                </div>
                <div className="sub-content-bubble-stats-column">
                    <div className="sub-content-bubble-stats-column-text-md">{subbreaditData?.subscribers.length}</div>
                    <div className="sub-content-bubble-stats-column-text-sm">Online</div>
                </div>
                <div className="sub-content-bubble-stats-column">
                    <div className="sub-content-bubble-stats-column-text-md">Top {"10%"}</div>
                    <div className="sub-content-bubble-stats-column-text-sm">Ranking</div>
                </div>
            </div>
            <button onClick={handleSub} className={isSubbed ? "un subscription-button" : "subscription-button"}>{isSubbed ? "unsubscribe" : "subscribe"}</button>
        </div>
    )
}

export default SubbreaditInfo