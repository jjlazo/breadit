import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ModalComponents.css";

function SubbreaditFormModal() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [errors, setErrors] = useState({});
  // const { closeModal } = useModal();

  return (
    <>
      <h2>Create a subbreadit</h2>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
            placeholder="Description"
            required
          />
        </label>
        <button className="button" type="submit">create</button>
      </form>
    </>
  );
}

export default SubbreaditFormModal;
