import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import * as subscriptionActions from "../../redux/subscriptions"
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((store) => store.session.user);
  const divRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (divRef.current && !divRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    dispatch(subscriptionActions.removeAllSubscriptions())
    closeMenu();
  };

  return (
    <>
      <button className="profile button" onClick={toggleMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        <img className="profile" src={"https://i.ibb.co/LxDRcz0/Mask-group.png"} alt="Profile"/>
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={divRef}>
          {sessionUser ? (
            <>
              <div>{sessionUser.username}</div>
              <div>{sessionUser.email}</div>
              <hr></hr>
              <div>
                <button className="logout" onClick={logout}>Log Out</button>
              </div>
            </>
          ) : (
            <>
              <div className="clickable">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <hr></hr>
              <div className="clickable">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
