import Axios from "axios"

export function LoginRequest(user, history) {
  return async () => {
    try {
      const res = await Axios.post("https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap", user);
      if (res.status === 200 || res.status === 201) {
        const objdata = res.data;
        //console.log(objdata.maNhom);
        if (objdata.maLoaiNguoiDung !== "KhachHang" || objdata.maNhom !== "GP01") {
          alert('Tài khoản của bạn không có quyền truy cập!');
        }
        else {
          localStorage.setItem("user", JSON.stringify(objdata));
          history.push("/ban-lam-viec");
        }
      }
    }
    catch {
      alert('Sai tên đăng nhập hoặc mật khẩu!');
    }
  }
}

// Lấy danh sách user
export function GetUserList(searchKey, activePage, totalPerPage) {
  return async (dispatch) => {
    let url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?maNhom=GP01`;
    if (searchKey) url += `&tuKhoa=${searchKey}`;
    if (activePage) url += `&soTrang=${activePage}`;
    if (totalPerPage) url += `&soPhanTuTrenTrang=${totalPerPage}`;
    try {
      const res = await Axios.get(url);
      if (res.status === 200 || res.status === 201) {
        dispatch(getUserListSuccess(res.data));
      }
    }
    catch (error) {
      console.log(error.response);
      dispatch(getUserListFailed(error));
      if (error.response) alert(error.response.data);
    }
  }
}

export function getUserListSuccess(userList) {
  return {
    type: "GET_USER_LIST_SUCCESS",
    payload: userList,
  };
}

export function getUserListFailed(error) {
  return {
    type: "GET_USER_LIST_FAILED",
    payload: error,
  };
}

// Lấy một user
export function GetUser(taiKhoan) {
  return async (dispatch) => {
    try {
      const res = await Axios({
        method: "GET",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`,
      });
      if (res.status === 200 || res.status === 201) {
        dispatch(getUserSuccess(res.data[0]));
      }
    }
    catch (error) {
      console.log(error.response);
      dispatch(getUserFailed(error));
      if (error.response) alert(error.response.data);
    }
  }
}

export function getUserSuccess(taiKhoan) {
  return {
    type: "GET_USER_SUCCESS",
    payload: taiKhoan,
  };
}

export function getUserFailed(error) {
  return {
    type: "GET_USER_FAILED",
    payload: error,
  };
}

// Thêm một user mới
export function InsertUser(data) {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      //console.log(data);
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
        data,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        }
      });
      if (res.status === 200 || res.status === 201) {
        alert('Thêm dữ liệu thành công.!');
      }
      else {
        alert('Đã xảy ra lỗi trong quá trình thêm dữ liệu.!');
      }
    }
    catch (error) {
      console.log(error);
      if (error.response) alert(error.response.data);
    }
  }
}

// Cập nhật một user
export function UpdateUser(data) {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await Axios({
        method: "PUT",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        data,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        }
      });
      if (res.status === 200 || res.status === 201) {
        alert('Đã sửa dữ liệu thành công.!');
      }
      else {
        alert('Đã xảy ra lỗi trong quá trình cập nhật dữ liệu.!');
      }
    }
    catch (error) {
      console.log(error);
      if (error.response) alert(error.response.data);
    }
  }
}

// Xóa một user
export function DeleteUser(taiKhoan) {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await Axios({
        method: "DELETE",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        }
      });
      if (res.status === 200 || res.status === 201) {
        dispatch(deleteUserListSuccess(taiKhoan));
        alert(`Xóa thành công tài khoản ${taiKhoan} khỏi hệ thống.!`);
      }
      else {
        alert('Đã xảy ra lỗi trong quá trình xóa dữ liệu.!');
      }
      //console.log(res.status);
    }
    catch (error) {
      //console.log(error);
      dispatch(deleteUserListFailed(error));
      if (error.response) alert(error.response.data);
    }
  }
}

export function deleteUserListSuccess(taiKhoan) {
  return {
    type: "DELETE_USER_LIST_SUCCESS",
    payload: taiKhoan,
  };
}

export function deleteUserListFailed(error) {
  return {
    type: "DELETE_USER_LIST_FAILED",
    payload: error,
  };
}