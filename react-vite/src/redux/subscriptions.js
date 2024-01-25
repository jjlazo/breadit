export const CREATE_SUBSCRIPTIONS = 'subscriptions/CREATE_SUBSCRIPTIONS';
export const REMOVE_SUBSCRIPTION = 'subscriptions/REMOVE_SUBSCRIPTION';

export const createSubscription = (subbreadit) => ({
  type: CREATE_SUBSCRIPTIONS,
  subbreadit
});

export const removeSubscription = (subbreaditId) => ({
  type: REMOVE_SUBSCRIPTION,
  subbreaditId
});

export const addSubscription = (subbreaditId) => async dispatch => {
    const response = await fetch(`/api/subbreadits/${subbreaditId}/subscription`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(response.ok){
        const subscription = await response.json()
        dispatch(createSubscription(subscription))
        return response
    }else{
        const errors = await response.json()
        return errors
    }
}

export const deleteSubscription = (subbreaditId) => async dispatch => {
    const response = await fetch(`/api/subbreadits/${subbreaditId}/subscription`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
  
    if(response.ok){
        dispatch(removeSubscription(subbreaditId))
    }else{
        const errors = await response.json()
        return errors
    }
}

const subscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBSCRIPTIONS:
      return { ...state, [action.subbreadit.id]: action.subbreadit };
    case REMOVE_SUBSCRIPTION: {
      const newState = { ...state };
      delete newState[action.subbreaditId];
      return newState;
    }
    default:
      return state;
  }
};

export default subscriptionReducer;
