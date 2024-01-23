export const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
export const CREATE_COMMENT = 'comments/CREATE_COMMENT';
export const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

export const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments
});

export const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment
});

export const editComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
});

export const removeComment = (postId, commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
  postId
});

export const getComments = () => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments`)
  
    if(response.ok){
      const comments = await response.json()
      dispatch(loadComments(comments))
    }else{
        const errors = await response.json()
        return errors
    }
}

export const addComments = (postId, comment) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })

    if(response.ok){
        const comment = await response.json()
        dispatch(createComment(comment))
        return response
    }else{
        const errors = await response.json()
        return errors
    }
}

export const updateComment = (postId, commentId, comment) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
  
    if(response.ok){
        const comment = await response.json()
        dispatch(editComment(comment))
        return
    }else{
        const errors = await response.json()
        return errors
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
  
    if(response.ok){
        dispatch(removeComment(commentId))
        return
    }else{
        const errors = await response.json()
        return errors
    }
}

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COMMENTS: {
      const commentsState = {};
      if(action.comments.length){
          action.comments.forEach((comment) => {
            commentsState[comment.id] = comment;
          });
      }
      return commentsState;
    }
    case CREATE_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case UPDATE_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case REMOVE_COMMENT: {
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    }
    default:
      return state;
  }
};

export default commentsReducer;
