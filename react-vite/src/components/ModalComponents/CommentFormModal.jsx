import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../redux/comments'
import { useParams } from "react-router-dom";
import "./ModalComponents.css";

function CommentFormModal() {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const { toastId } = useParams()
  const sessionUser = useSelector((state) => state.session.user)
  const [errors, setErrors] = useState({});
  const [bodyFocused, setBodyFocused] = useState(false);
  const { closeModal } = useModal();

  const addComment = async (e) => {
    e.preventDefault()
    const response = await dispatch(commentActions.addComment(toastId, { body }));

    if (response.errors) {
      setErrors(response.errors);
    }
    else {
      closeModal()
    }
  }

  return (
    <>
      <h2>Create a comment</h2>
      <form className="form" onSubmit={addComment}>
        <div className="form-field">
          <label htmlFor="body" className={body.length > 0 || bodyFocused ? "form-label has-content" : "form-label"}>
            Body
            {errors.body && <span className="error-message">{errors.body}</span>}
          </label>
          <textarea
            id="body"
            type="text"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (errors.body) {
                const newErrors = { ...errors };
                delete newErrors.body
                setErrors(newErrors)
              }
            }}
            className="textarea"
            onFocus={() => setBodyFocused(true)}
            onBlur={() => setBodyFocused(false)}
          />
        </div>
        {/* <label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea"
            placeholder="Comment"
            required
          />
        </label> */}
        <button className="button" type="submit">comment</button>
      </form>
    </>
  );
}

export default CommentFormModal;
