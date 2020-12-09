const initialState = {
  isLoading: false,
};

const commonReducer = (state = initialState, action) => {
  let { type } = action;
  switch (type) {
    case "START_LOADING": {
      return { ...state, isLoading: true };
    }
    case "STOP_LOADING": {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};

export default commonReducer;
