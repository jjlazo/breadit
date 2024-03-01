import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as commentActions from '../../redux/comments'
import { useParams } from "react-router-dom";
import "./ModalComponents.css";

function UpdateCommentFormModal({ commentId, defaultBody }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState(defaultBody);
  const sessionUser = useSelector((state) => state.session.user)
  const [bodyFocused, setBodyFocused] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const updateComment = async (e, commentId) => {
    e.preventDefault()
    const response = await dispatch(commentActions.updateComment(commentId, { body }))

    if (response.errors) {
      setErrors(response.errors);
    }
    else {
      closeModal()
    }
  }

  return (
    <>
      <h2>Update comment</h2>
      <form className="form" onSubmit={(e) => updateComment(e, commentId)}>
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
        <button className="button" type="submit">update</button>
      </form>
    </>
  );
}

export default UpdateCommentFormModal;
