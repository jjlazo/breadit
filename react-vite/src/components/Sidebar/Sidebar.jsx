import React from "react"
import "./Sidebar.css"
import { useNavigate } from "react-router-dom";
import { Home as HomeIcon } from 'lucide-react';
import { useSelector } from "react-redux";

const Toast = () => {
    return(
        <div style={{ margin: "1px" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
        <mask id="path-1-inside-1_75_1405" fill="white">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 6.69487C0 2.9974 2.9974 0 6.69487 0C8.1131 0 9.42834 0.44099 10.5109 1.19333C11.5935 0.44099 12.9088 0 14.327 0C18.0245 0 21.0219 2.9974 21.0219 6.69487C21.0219 8.5113 20.2985 10.1588 19.1241 11.3649V20H1.8978V11.3649C0.72339 10.1588 0 8.5113 0 6.69487Z"/>
        </mask>
        <path d="M10.5109 1.19333L9.32204 2.90412L10.5109 3.73033L11.6998 2.90412L10.5109 1.19333ZM19.1241 11.3649L17.6314 9.91155L17.0407 10.5182V11.3649H19.1241ZM19.1241 20V22.0833H21.2074V20H19.1241ZM1.8978 20H-0.185537V22.0833H1.8978V20ZM1.8978 11.3649H3.98113V10.5182L3.39044 9.91156L1.8978 11.3649ZM6.69487 -2.08333C1.8468 -2.08333 -2.08333 1.84681 -2.08333 6.69487H2.08333C2.08333 4.14799 4.14799 2.08333 6.69487 2.08333V-2.08333ZM11.6998 -0.517464C10.2795 -1.50451 8.55165 -2.08333 6.69487 -2.08333V2.08333C7.67456 2.08333 8.57719 2.38649 9.32204 2.90412L11.6998 -0.517464ZM14.327 -2.08333C12.4702 -2.08333 10.7424 -1.50451 9.32204 -0.517464L11.6998 2.90412C12.4447 2.38649 13.3473 2.08333 14.327 2.08333V-2.08333ZM23.1052 6.69487C23.1052 1.84681 19.1751 -2.08333 14.327 -2.08333V2.08333C16.8739 2.08333 18.9385 4.14799 18.9385 6.69487H23.1052ZM20.6167 12.8183C22.1546 11.2389 23.1052 9.07578 23.1052 6.69487H18.9385C18.9385 7.94682 18.4424 9.07866 17.6314 9.91155L20.6167 12.8183ZM17.0407 11.3649V20H21.2074V11.3649H17.0407ZM19.1241 17.9166H1.8978V22.0833H19.1241V17.9166ZM3.98113 20V11.3649H-0.185537V20H3.98113ZM-2.08333 6.69487C-2.08333 9.07579 -1.13269 11.2389 0.405148 12.8183L3.39044 9.91156C2.57947 9.07867 2.08333 7.94682 2.08333 6.69487H-2.08333Z" fill="#C4C4C4" mask="url(#path-1-inside-1_75_1405)"/>
      </svg>
        </div>
    )
}

function Sidebar(){
    const sessionUser = useSelector((store) => store.session.user);
    const navigate = useNavigate()
    return(
        <div className="side-bar">
            <div className="side-bar-margin"></div>
            <div onClick={() => navigate(`/`)} className="side-bar-row">
                <HomeIcon color={"#C4C4C4"}/>
                Home
            </div>
            {sessionUser?.id && <div onClick={() => navigate(`/u/toasts/${sessionUser.id}`)} className="side-bar-row">
                <Toast/>
                Toasts
            </div>}
        </div>
    )
}

export default Sidebar