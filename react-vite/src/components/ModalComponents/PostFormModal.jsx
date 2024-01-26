import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import * as postActions from '../../redux/posts'
import "./ModalComponents.css";

function PostFormModal({ subbreaditId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const sendPost = async (e) => {
    e.preventDefault()
    const response = await dispatch(postActions.addPost({
      title,
      body,
      subbreaditId
    }))
    closeModal()
    navigate(`/subbreadit/${response.subbreadit_id}/toast/${response.id}`)
  }

  return (
    <>
      <h2>Post a toast</h2>
      <form className="form" onSubmit={sendPost}>
        <label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="Title"
            required
          />
        </label>
        <label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea"
            placeholder="Body"
            required
          />
        </label>
        <button className="button" type="submit">post</button>
      </form>
    </>
  );
}

export default PostFormModal;
