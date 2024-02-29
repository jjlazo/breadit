import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteComment } from "../../redux/comments";
import { useNavigate } from "react-router-dom";

function DeleteCommentModal({ comment }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch();

    const submitDelete = async () => {
        dispatch(deleteComment(comment.id));
        closeModal();
    }

    return (
        <>
            <h2>Delete Your Comment?</h2>
            <div id="confirm-delete-buttons">
                <button className="confirm-button yes"  onClick={submitDelete}>Yes</button>
                <button className="confirm-button"  onClick={closeModal}>No</button>
            </div>
        </>
    )
}

export default DeleteCommentModal;
