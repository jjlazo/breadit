export const LOAD_SUBBREADITS = 'subbreadits/LOAD_SUBBREADITS';
export const CREATE_SUBBREADIT = 'subbreadits/CREATE_SUBBREADIT';

export const loadSubbreadits = (subbreadits) => ({
  type: LOAD_SUBBREADITS,
  subbreadits
});

export const createSubbreadit = (subbreadit) => ({
  type: CREATE_SUBBREADIT,
  subbreadit
});

export const getSubbreadits = () => async dispatch => {
    const response = await fetch(`/api/subbreadits`)
  
    if(response.ok){
      const subbreadits = await response.json()
      dispatch(loadSubbreadits(subbreadits))
    }else{
        const errors = await response.json()
        return errors
    }
}

export const addSubbreadit = (subbreadit) => async dispatch => {
    const response = await fetch('/api/subbreadits', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subbreadit)
    })

    if(response.ok){
        const subbreadit = await response.json()
        dispatch(createSubbreadit(subbreadit))
        return subbreadit
    }else{
        const errors = await response.json()
        return errors
    }
}

const subbreaditsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SUBBREADITS: {
      const subbreaditsState = {};
      if(action.subbreadits.Subbreadits.length){
          action.subbreadits.Subbreadits.forEach((subbreadit) => {
            subbreaditsState[subbreadit.id] = subbreadit;
          });
      }
      return subbreaditsState;
    }
    case CREATE_SUBBREADIT:
      return { ...state, [action.subbreadit.id]: action.subbreadit };
    default:
      return state;
  }
};

export default subbreaditsReducer;
