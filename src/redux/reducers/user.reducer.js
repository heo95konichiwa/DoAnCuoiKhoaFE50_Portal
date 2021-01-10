const initialState = {
    userList: null,
    userInfo: { taiKhoan: '', matKhau: '', email: '', soDt: '', maNhom: 'GP05', maLoaiNguoiDung: 'QuanTri', hoTen: ''},
    userError: null,
  };
  
  const userReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
      // get list user
      case "GET_USER_LIST_SUCCESS": {
        return { ...state, userList: payload };
      }
      case "GET_USER_LIST_FAILED": {
        return { ...state, userError: payload };
      }

      // get user
      case "GET_USER_SUCCESS": {
        return { ...state, userInfo: payload };
      }
      case "GET_USER_FAILED": {
        return { ...state, userError: payload };
      }

      //delete user
      case "DELETE_USER_LIST_SUCCESS": {
        const newUsers = state.userList.items.filter((user) => user.taiKhoan !== payload);
        return { ...state, userList: newUsers };
      }
      case "DELETE_USER_LIST_FAILED": {
        return { ...state, userError: payload };
      }
      default:
        return state;
    }
  };
  
  export default userReducer;
  