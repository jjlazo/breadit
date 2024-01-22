import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function TopCommunitiesInfo({ data }){
    const navigate = useNavigate()
    return(
        <div className="sub-content-bubble">
            <div className="bubble-header">Top Communities</div>
            <div className="bubble-content">
                {data.map((communities) => (
                    <div onClick={() => navigate(`/subbreadit/${1}`)} className="bubble-subbreadits">
                        <img className="bubble-toast" src={"https://i.ibb.co/1LvSt5B/Mask-group-1.png"} alt=""/>
                        <div>
                            <div>b/{"subbreadit"}</div>
                            <div className="sub-count">1535 subscribers</div>
                        </div>
                    </div>
                ))

                }
            </div>
        </div>
    )
}

export default TopCommunitiesInfo