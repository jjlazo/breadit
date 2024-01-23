import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ModalComponents.css";

function UpdateCommentFormModal() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  // const [errors, setErrors] = useState({});
  // const { closeModal } = useModal();

  return (
    <>
      <h2>Update comment</h2>
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
        <button className="button" type="submit">update</button>
      </form>
    </>
  );
}

export default UpdateCommentFormModal;