import { CREATE_DOWNVOTE, CREATE_UPVOTE, DELETE_DOWNVOTE, DELETE_UPVOTE } from "./votes";

export const LOAD_POSTS = 'posts/LOAD_POSTS';
export const LOAD_POST = 'posts/LOAD_POST';
export const CREATE_POST = 'posts/CREATE_POST';
export const UPDATE_POST = 'posts/UPDATE_POST';
export const REMOVE_POST = 'posts/REMOVE_POST';

export const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts
});

export const loadPost = (post) => ({
  type: LOAD_POST,
  post
});

export const createPost = (post) => ({
  type: CREATE_POST,
  post
});

export const editPost = (post) => ({
  type: UPDATE_POST,
  post
});

export const removePost = (postId) => ({
  type: REMOVE_POST,
  postId
});

export const getPosts = () => async dispatch => {
  const response = await fetch(`/api/posts`)

  if (response.ok) {
    const posts = await response.json()
    dispatch(loadPosts(posts))
  } else {
    const errors = await response.json()
    return errors
  }
}

export const getPostById = (postId) => async dispatch => {
  const response = await fetch(`/api/posts/${postId}`)

  if (response.ok) {
    const post = await response.json()
    dispatch(loadPost(post))
    return post
  } else {
    const errors = await response.json()
    return errors
  }
}

export const getPostsByUserId = () => async dispatch => {
  const response = await fetch(`/api/posts/current`)

  if (response.ok) {
    const post = await response.json()
    dispatch(loadPosts(post))
    return response
  } else {
    const errors = await response.json()
    return errors
  }
}

export const getPostsBySpecificUserId = (userId) => async dispatch => {
  const response = await fetch(`/api/posts/specific/${userId}`)

  if (response.ok) {
    const posts = await response.json()
    dispatch(loadPosts(posts))
    return response
  } else {
    const errors = await response.json()
    return errors
  }
}

export const getSubbreaditPosts = (subbreaditId) => async dispatch => {
  const response = await fetch(`/api/subbreadits/${subbreaditId}/posts`)

  if (response.ok) {
    const posts = await response.json()
    dispatch(loadPosts(posts))
  } else {
    const errors = await response.json()
    return errors
  }
}

export const addPost = (post) => async dispatch => {
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: post
  })

  if (response.ok) {
    const post = await response.json()
    dispatch(createPost(post))
    return post
  } else {
    const errors = await response.json()
    return {"errors": errors}
  }
}

export const updatePost = (postId, post) => async dispatch => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: post
  })

  if (response.ok) {
    const post = await response.json()
    dispatch(editPost(post))
    return post;
  } else {
    const errors = await response.json()
    return {"errors": errors}
  }
}

export const deletePost = (postId) => async dispatch => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })

  if (response.ok) {
    dispatch(removePost(postId))
  } else {
    const errors = await response.json()
    return errors
  }
}

const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS: {
      const postsState = {};
      if (action.posts.Posts.length) {
        action.posts.Posts.forEach((post) => {
          postsState[post.id] = post;
        });
      }
      return postsState;
    }
    case LOAD_POST: {
      const postsState = {};
      const post = action.post.Post
      postsState[post.id] = post
      return postsState;
    }
    case CREATE_POST:
      return { ...state, [action.post.id]: action.post };
    case UPDATE_POST:
      return { ...state, [action.post.id]: action.post };
    case REMOVE_POST: {
      const newState = { ...state };
      delete newState[action.postId];
      return newState;
    }
    case CREATE_UPVOTE:
    return { ...state, [action.toast.id]: { ...state[action.toast.id], upvotes: [ ...state[action.toast.id].upvotes, action.userId], downvotes: state[action.toast.id].downvotes.filter(id => id != action.userId) }}
    case CREATE_DOWNVOTE:
      return { ...state, [action.toast.id]: { ...state[action.toast.id], downvotes: [ ...state[action.toast.id].downvotes, action.userId], upvotes: state[action.toast.id].upvotes.filter(id => id != action.userId) }}
    case DELETE_UPVOTE:
      return { ...state, [action.toastId]: { ...state[action.toastId], upvotes: state[action.toastId].upvotes.filter(id => id != action.userId)}}
    case DELETE_DOWNVOTE:
      return { ...state, [action.toastId]: { ...state[action.toastId], downvotes: state[action.toastId].downvotes.filter(id => id != action.userId)}}
    default:
      return state;
  }
};

export default postsReducer;
