import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ModalComponents.css";

function UpdatePostFormModal() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  // const [errors, setErrors] = useState({});
  // const { closeModal } = useModal();

  return (
    <>
      <h2>Update toast</h2>
      <form className="form">
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea"
            placeholder="Message"
            required
          />
        </label>
        <button className="button" type="submit">update</button>
      </form>
    </>
  );
}

export default UpdatePostFormModal;
