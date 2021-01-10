const initialState = {
    cinemaList: null,
    cinemaError: null,
  };
  
  const cinemaReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
      case "GET_DATA_LIST_SUCCESS": {
        return { ...state, cinemaList: payload };
      }
      case "GET_DATA_LIST_FAILED": {
        return { ...state, cinemaError: payload };
      }
      default:
        return state;
    }
  };
  
  export default cinemaReducer;