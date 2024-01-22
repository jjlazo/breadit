import { useNavigate } from "react-router-dom";
import { PlusCircle } from 'lucide-react';
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate()
  return (
    <nav>
        <img onClick={() => navigate("/")} className="logo" src={"https://i.ibb.co/RcChNNJ/Union.png"} alt="Home"/>
        <div className="search">
          <input className="search-input" placeholder={`search b/${"subbreadit"}`}></input>
          <PlusCircle strokeWidth={"1.5px"} className="add-subbbreadit"/>
        </div>
        <ProfileButton />
    </nav>
  );
}

export default Navigation;
