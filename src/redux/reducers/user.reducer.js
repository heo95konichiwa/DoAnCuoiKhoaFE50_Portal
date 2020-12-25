const initialState = {
    userList: null,
    userInfo: null,
  };
  
  const userReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
      case "GET_USER_LIST_SUCCESS": {
        return { ...state, userList: payload };
      }
      default:
        return state;
    }
  };
  
  export default userReducer;
  