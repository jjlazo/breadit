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
    setImageLoading(true);

    const response = await dispatch(postActions.addPost(formData));
    console.log(response);

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
        <label>
          <div className="error-container">
            {errors.image_url && <span className="error-message">{errors.image_url}</span>}
          </div>
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
          {(imageLoading) && <p>Loading...</p>}
        </label >
        <button className="button" type="submit">post</button>
      </form >
    </>
  );
}

export default PostFormModal;
