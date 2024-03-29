import React, { useEffect, useRef, useState, useContext } from "react"
import { PlusCircle } from 'lucide-react';
import OpenModalButton from "../OpenModalButton";
import { SubbreaditFormModal } from "../ModalComponents";
import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from 'react-redux';
import * as postActions from '../../redux/posts'
import * as subbreaditActions from '../../redux/subbreadits'
import "./Navigation.css";
import { SubscriptionContext } from "../../context/SubscriptionContext";
import { useNavigate, useParams } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate()
  const { setIsSubscribed } = useContext(SubscriptionContext)
  const { subbreaditId, toastId } = useParams()
  const [showMenu, setShowMenu] = useState(false);
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  let subscriptions = useSelector(state => state.subscriptions)
  let subbreadits = useSelector(state => state.subbreadits)
  const sessionUser = useSelector(state => state.session.user)
  const searchRef = useRef()

  let subbreaditData = Object.values(subbreadits)

  useEffect(() => {
    dispatch(postActions.getPosts())
  })

  const closeMenu = () => setShowMenu(false);

  const focus = () => {
    setIsFocused(true)
  }

  useEffect((e) => {
    const onClick = (e) => {
      const target = e.target
      if(searchRef.current && !searchRef.current.contains(target)){
          setIsFocused(false)
      }
    }

    document.addEventListener("click", onClick)

    return () => document.removeEventListener("click", onClick)
  })

  const redirectTOSubbreadit = (e, subbreaditId) => {
    navigate(`/subbreadit/${subbreaditId}`)
      setIsFocused(false)
      setSearch("")
  } 

  // useEffect(() => {
  //   dispatch(subbreaditActions.getSubbreadits())
  // }, [window.location.pathname])

  useEffect(() => {
    setIsSubscribed(subscriptions.hasOwnProperty(subbreaditId))
    dispatch(subbreaditActions.getSubbreadits())
  }, [window.location.pathname, subscriptions])

  useEffect(() => {
    async function wrapperFn() {
        const response = await fetch(`/api/subbreadits/${subbreaditId}`)
        if(!response.ok){
            const errors = await response.json()
            navigate('/errors', { state: { "statusCode": 404, "message": errors.errors.message } })
        }
    } 
    wrapperFn()
  }, [subbreaditId])

  useEffect(() => {
    async function wrapperFn() {
        const response = await fetch(`/api/posts/${toastId}`)
        if(!response.ok){
            const errors = await response.json()
            navigate('/errors', { state: { "statusCode": 404, "message": errors.errors.message } })
        }
    } 
    wrapperFn()
  }, [toastId])

  const filteredSubbreaditData = () => {
    const results = subbreaditData.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    return results
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter'){
      navigate(`/subbreadit/${filteredSubbreaditData()[0].id}`)
      setIsFocused(false)
      setSearch("")
      const input = document.getElementById("search-input")
      input.blur()
    }
  }

  return (
    <nav>
        <img onClick={() => navigate("/")} className="logo" src={"https://i.ibb.co/RcChNNJ/Union.png"} alt="Home"/>
        <div ref={searchRef} className="search">
          <input type="text" id="search-input" onFocus={focus} onKeyDown={handleKeyDown} value={search} onChange={(e) => setSearch(e.target.value)}  className={isFocused ? "search-input focused" : "search-input"} placeholder={`search b/${"subbreadit"}`}></input>
          {/*  */}
          <div className="add-subbreadit-container">
            {sessionUser?.id && <OpenModalButton
              // itemText="toast"
              onButtonClick={() => (closeMenu, setIsFocused(false))}
              modalComponent={<SubbreaditFormModal />}
              buttonComponent={<PlusCircle strokeWidth={"1.5px"} className="add-subbbreadit"/>}
              />}
          </div>
          <div className={isFocused ? "drop-down" : "drop-down hidden"}>
            {search ? 
              filteredSubbreaditData().map((subbreadit) => (
                <div key={subbreadit.id} onClick={(e) => redirectTOSubbreadit(e, subbreadit.id)} className="drop-down-content">{subbreadit.name}</div>
              ))
              :
              subbreaditData.map((subbreadit) => (
                <div key={subbreadit.id} onClick={(e) => redirectTOSubbreadit(e, subbreadit.id)} className="drop-down-content">{subbreadit.name}</div>
              ))
            }
          </div>
        </div>
        <ProfileButton />
    </nav>
  );
}

export default Navigation;



