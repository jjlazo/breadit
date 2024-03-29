import { REMOVE_USER } from "./session";

export const CREATE_UPVOTE = 'Votes/CREATE_UPVOTE';
export const CREATE_DOWNVOTE = 'Votes/CREATE_DOWNVOTE';
export const READ_UPVOTES = 'Votes/READ_UPVOTES';
export const READ_DOWNVOTES = 'Votes/READ_DOWNVOTES';
export const DELETE_UPVOTE = 'Votes/DELETE_UPVOTE';
export const DELETE_DOWNVOTE = 'Votes/DELETE_DOWNVOTE';

export const selectUpvotes = state => state.votes.upvotes;

export const selectDownvotes = state => state.votes.downvotes;

export const readUpvotes = (toasts) => ({
    type: READ_UPVOTES,
    toasts
});

export const readDownvotes = (toasts) => ({
    type: READ_DOWNVOTES,
    toasts
});

export const createUpvote = (toast, userId) => ({
    type: CREATE_UPVOTE,
    toast,
    userId
});

export const createDownvote = (toast, userId) => ({
    type: CREATE_DOWNVOTE,
    toast,
    userId
});

export const deleteUpvote = (toastId, userId) => ({
    type: DELETE_UPVOTE,
    toastId,
    userId
});

export const deleteDownvote = (toastId, userId) => ({
    type: DELETE_DOWNVOTE,
    toastId,
    userId
});

export const fetchUpvotes = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/upvotes`)

    if (response.ok) {
        const toasts = await response.json()
        dispatch(readUpvotes(toasts))
        return toasts
    } else {
        const errors = await response.json()
        return errors
    }
}

export const fetchDownvotes = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/downvotes`)

    if (response.ok) {
        const toasts = await response.json()
        dispatch(readDownvotes(toasts))
        return toasts
    } else {
        const errors = await response.json()
        return errors
    }
}

export const fetchCreateUpvote = (id, userId) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/upvote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const toast = await response.json()
        dispatch(createUpvote(toast, userId))
        return toast
    } else {
        const errors = await response.json()
        return errors
    }
}

export const fetchCreateDownvote = (id, userId) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/downvote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const toast = await response.json()
        dispatch(createDownvote(toast, userId))
        return toast
    } else {
        const errors = await response.json()
        return errors
    }
}

export const fetchDeleteUpvote = (id, userId) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/upvote`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    if (response.ok) {
        dispatch(deleteUpvote(id, userId))
        return
    } else {
        const errors = await response.json()
        return errors
    }
}

export const fetchDeleteDownvote = (id, userId) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/downvote`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (response.ok) {
        dispatch(deleteDownvote(id, userId))
        return
    } else {
        const errors = await response.json()
        return errors
    }
}

const votesReducer = (state = { upvotes: {}, downvotes: {} }, action) => {
    switch (action.type) {
        case READ_UPVOTES: {
            const votesState = {...state, upvotes: { ...state.upvotes }};
            if (action.toasts.Toasts.length) {
                action.toasts.Toasts.forEach((toast) => {
                    votesState.upvotes[toast.id] = toast;
                });
            }
            return votesState;
        }
        case READ_DOWNVOTES: {
            const votesState = {...state, downvotes: { ...state.downvotes }};
            if (action.toasts.Toasts.length) {
                action.toasts.Toasts.forEach((toast) => {
                    votesState.downvotes[toast.id] = toast;
                });
            }
            return votesState;
        }
        case CREATE_UPVOTE: {
            const voteState = { ...state, upvotes: { ...state.upvotes, [action.toast.id]: action.toast }, downvotes: { ...state.downvotes } };
            delete voteState.downvotes[action.toast.id]
            return voteState
        }
        case CREATE_DOWNVOTE: {
            const voteState = { ...state, downvotes: { ...state.downvotes, [action.toast.id]: action.toast }, upvotes: { ...state.upvotes} };
            delete voteState.upvotes[action.toast.id]
            return voteState
        }
        case DELETE_UPVOTE: {
            const newState = { ...state, upvotes: { ...state.upvotes } };
            delete newState.upvotes[action.toastId];
            return newState;
        }
        case DELETE_DOWNVOTE: {
            const newState = { ...state, downvotes: { ...state.downvotes } };
            delete newState.downvotes[action.toastId];
            return newState;
        }
        case REMOVE_USER:
            return { upvotes: {}, downvotes: {} }
        default:
            return state;
    }
};

export default votesReducer;
