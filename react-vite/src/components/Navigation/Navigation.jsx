import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { PlusCircle } from 'lucide-react';
import OpenModalButton from "../OpenModalButton";
import { SubbreaditFormModal } from "../ModalComponents";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => setShowMenu(false);

  return (
    <nav>
        <img onClick={() => navigate("/")} className="logo" src={"https://i.ibb.co/RcChNNJ/Union.png"} alt="Home"/>
        <div className="search">
          <input className="search-input" placeholder={`search b/${"subbreadit"}`}></input>
          {/*  */}
          <div className="add-subbreadit-container">
            <OpenModalButton
              // itemText="toast"
              onButtonClick={closeMenu}
              modalComponent={<SubbreaditFormModal />}
              buttonComponent={<PlusCircle strokeWidth={"1.5px"} className="add-subbbreadit"/>}
              />
          </div>
        </div>
        <ProfileButton />
    </nav>
  );
}

export default Navigation;
