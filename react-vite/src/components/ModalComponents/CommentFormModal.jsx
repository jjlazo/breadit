import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ModalComponents.css";

function CommentFormModal() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  // const [errors, setErrors] = useState({});
  // const { closeModal } = useModal();

  return (
    <>
      <h2>Create a comment</h2>
      <form className="form">
        <label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea"
            placeholder="Comment"
            required
          />
        </label>
        <button className="button" type="submit">comment</button>
      </form>
    </>
  );
}

export default CommentFormModal;