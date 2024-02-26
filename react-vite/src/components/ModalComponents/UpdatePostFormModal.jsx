import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postActions from '../../redux/posts'
import { useParams } from "react-router-dom";
import "./ModalComponents.css";

function UpdatePostFormModal({ defaultTitle, defaultBody }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(defaultTitle);
  const [body, setBody] = useState(defaultBody);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const { toastId } = useParams();
  const { subbreaditId } = useParams();
  const { closeModal } = useModal();

  const updatePost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image_url", image);
    formData.append("subbreadit_id", subbreaditId);
    setImageLoading(true);

    const response = dispatch(postActions.updatePost(toastId, formData));

    if (response.errors) {
      setErrors(response.errors);
      setImageLoading(false);
    }
    else {
      closeModal()
    }
  }

  return (
    <>
      <h2>Update toast</h2>
      <form className="form" onSubmit={updatePost}>
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
        <button className="button" type="submit">update</button>
      </form>
    </>
  );
}

export default UpdatePostFormModal;
