export const CREATE_SUBSCRIPTIONS = 'subscriptions/CREATE_SUBSCRIPTIONS';
export const REMOVE_SUBSCRIPTION = 'subscriptions/REMOVE_SUBSCRIPTION';

export const createSubscription = (subscription) => ({
  type: CREATE_SUBSCRIPTIONS,
  subscription
});

export const removeSubscription = (subscriptionId) => ({
  type: REMOVE_SUBSCRIPTION,
  subscriptionId
});

export const addSubscription = (data) => async dispatch => {
    const response = await fetch('/api/subscription', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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

export const deleteSubscription = (subscriptionId) => async dispatch => {
    const response = await fetch(`/api/subscription/${subscriptionId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
  
    if(response.ok){
        dispatch(removeSubscription(subscriptionId))
    }else{
        const errors = await response.json()
        return errors
    }
}

const subscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBSCRIPTIONS:
      return { ...state, [action.subscription.id]: action.subscription };
    case REMOVE_SUBSCRIPTION: {
      const newState = { ...state };
      delete newState[action.subscriptionId];
      return newState;
    }
    default:
      return state;
  }
};

export default subscriptionReducer;
