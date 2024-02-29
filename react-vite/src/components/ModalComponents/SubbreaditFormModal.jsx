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
  const [errors, setErrors] = useState({});
  const [nameFocused, setNameFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const { closeModal } = useModal();

  const createSubbreadit = async (e) => {
    e.preventDefault()
    const response = await dispatch(subbreaditActions.addSubbreadit({
      name,
      description
    }))

    if (response.errors) {
      setErrors(response.errors);
    }
    else {
      closeModal()
      navigate(`/subbreadit/${response.id}`)
    }
  }

  return (
    <>
      <h2>Create a subbreadit</h2>
      <form className="form" onSubmit={createSubbreadit}>
        <div className="form-field">
          <label htmlFor="name" className={name.length > 0 || nameFocused ? "form-label has-content" : "form-label"}>
            Name
            {errors.name && <span className="error-message">{errors.name}</span>}
          </label>
          <input
            id="name"
            className="input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                const newErrors = { ...errors };
                delete newErrors.name
                setErrors(newErrors)
              }
            }}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description" className={description.length > 0 || descriptionFocused ? "form-label has-content" : "form-label"}>
            Description
            {errors.description && <span className="error-message">{errors.description}</span>}
          </label>
          <textarea
            id="description"
            className="textarea"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) {
                const newErrors = { ...errors };
                delete newErrors.description
                setErrors(newErrors)
              }
            }}
            onFocus={() => setDescriptionFocused(true)}
            onBlur={() => setDescriptionFocused(false)}
          />
        </div>
        <button className="button" type="submit">create</button>
      </form>
    </>
  );
}

export default SubbreaditFormModal;
