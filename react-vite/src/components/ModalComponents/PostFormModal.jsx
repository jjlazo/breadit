import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import * as postActions from '../../redux/posts'
import "./ModalComponents.css";

function PostFormModal({ subbreaditId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [titleFocused, setTitleFocused] = useState(false);
  const [bodyFocused, setBodyFocused] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const sendPost = async (e) => {
    e.preventDefault();

    setErrors({});

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image_url", image);
    formData.append("subbreadit_id", subbreaditId);

    const response = await dispatch(postActions.addPost(formData));
    setImageLoading(true);

    if (response.errors) {
      setErrors(response.errors);
      setImageLoading(false);
    }
    else {
      closeModal()
      navigate(`/subbreadit/${response.subbreadit_id}/toast/${response.id}`)
    }
  }

  return (
    <>
      <h2>Post a toast</h2>
      <form className="form" onSubmit={sendPost}>
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
        <label className="image-input-label">
        </label >
          <input
            type="file"
            id="image-input"
            accept="image/*"
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

        <button className="button" type="submit">post</button>
      </form >
    </>
  );
}

export default PostFormModal;
