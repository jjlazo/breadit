import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as subbreaditActions from '../../redux/subbreadits'
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./ModalComponents.css";

function SubbreaditFormModal() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

    const createSubbreadit = async (e) => {
      e.preventDefault()
      const response = await dispatch(subbreaditActions.addSubbreadit({
        name,
        description
      }))
      closeModal()
      navigate(`/subbreadit/${response.id}`)
  }

  return (
    <>
      <h2>Create a subbreadit</h2>
      <form className="form" onSubmit={createSubbreadit}>
        <label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Name"
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
