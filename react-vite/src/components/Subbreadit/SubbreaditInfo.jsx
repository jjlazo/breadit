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
    const [isSubbed, setIsSubbed] = useState(subscriptions.hasOwnProperty(subbreaditId)) 

    console.log(subscriptions)
    
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
        setIsSubbed(subscriptions.hasOwnProperty(subbreaditId))
    }, [subscriptions])

    useEffect(() => {
        async function wrapperFn(){
            const response = await dispatch(subbreaditActions.getSubbreaditById(subbreaditId))
            if(response?.errors){
                navigate('/errors', {state: {"statusCode": 404, "message": response.errors.message}})
            } 
        } 
        wrapperFn()
    }, [])

    useEffect(() => {
        if(sessionUser?.id){
            dispatch(subscriptionActions.getSubscriptions(sessionUser?.id))
        }
    }, [])

    return(
        <div className="sub-content-bubble">
            <div className="sub-content-bubble-header">
                <img onClick={() => navigate("/")} className="bubble-header-subbreadit" src={"https://i.ibb.co/LxDRcz0/Mask-group.png"} alt="Subbreadits"/>
                b/{subbreaditData?.name}
            </div>
            <div className="sub-content-bubble-description">{subbreaditData?.description}</div>
            <div className="sub-content-bubble-stats">
                <div className="sub-content-bubble-stats-column">
                    <div className="sub-content-bubble-stats-column-text-md">{subbreaditData?.subscribers.length}</div>
                    <div className="sub-content-bubble-stats-column-text-sm">{subbreaditData?.subscribers.length == 1 ? "Member" : "Members"}</div>
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
            {sessionUser?.id && <button onClick={handleSub} className={isSubbed ? "un subscription-button" : "subscription-button"}>{isSubbed ? "unsubscribe" : "subscribe"}</button>}
        </div>
    )
}

export default SubbreaditInfo