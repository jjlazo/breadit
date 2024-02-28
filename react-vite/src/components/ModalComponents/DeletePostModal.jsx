import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePost } from "../../redux/posts";
import { useNavigate } from "react-router-dom";

function DeletePostModal({ post }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitDelete = async () => {
        dispatch(deletePost(post.id));
        navigate(`/u/toasts/${post.user_id}`)
        closeModal();
    }

    return (
        <>
            <h2>Delete Your Toast?</h2>
            <div id="confirm-delete-buttons">
                <button className="confirm-button yes"  onClick={submitDelete}>Yes</button>
                <button className="confirm-button"  onClick={closeModal}>No</button>
            </div>
        </>
    )
}

export default DeletePostModal;
