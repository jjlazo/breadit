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
  // const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

    const addComment = (e) => {
      e.preventDefault()
      dispatch(commentActions.addComment(toastId, {body}))
      closeModal()
  }

  return (
    <>
      <h2>Create a comment</h2>
      <form className="form" onSubmit={addComment}>
        <label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
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