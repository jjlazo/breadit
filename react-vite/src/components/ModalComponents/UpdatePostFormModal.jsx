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
  const [titleFocused, setTitleFocused] = useState(false);
  const [bodyFocused, setBodyFocused] = useState(false);
  const { toastId } = useParams();
  const { subbreaditId } = useParams();
  const { closeModal } = useModal();

  const updatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image_url", image);
    formData.append("subbreadit_id", subbreaditId);
    setImageLoading(true);

    const response = await dispatch(postActions.updatePost(toastId, formData));

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
        {/* <label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="Title"
          />
        </label>
        <label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea"
            placeholder="Body"
          />
        </label> */}
        <div className="form-field">
          <label htmlFor="title" className={title.length > 0 || titleFocused ? "form-label has-content" : "form-label"}>
            Title
            {errors.title && <span className="error-message">{errors.title}</span>}
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                const newErrors = {...errors};
                delete newErrors.title
                setErrors(newErrors)
              }
            }}
            className="input"
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
          />
        </div>
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
                const newErrors = {...errors};
                delete newErrors.body
                setErrors(newErrors)
              }
            }}
            className="textarea"
            onFocus={() => setBodyFocused(true)}
            onBlur={() => setBodyFocused(false)}
          />
        </div>
        <label>
          <input
            type="file"
            id="image-input"
            accept="image/*" v
            onChange={(e) => {
              setImage(e.target.files[0])
              if (errors.image_url) {
                const newErrors = { ...errors };
                delete newErrors.image_url;
                setErrors(newErrors);
              }
            }}
          />
          <div className="error-container">
            {errors.image_url && <span className="error-message">{errors.image_url}</span>}
          </div>
          {(imageLoading) && <p>Loading...</p>}
        </label >
        <button className="button" type="submit">update</button>
      </form>
    </>
  );
}

export default UpdatePostFormModal;
