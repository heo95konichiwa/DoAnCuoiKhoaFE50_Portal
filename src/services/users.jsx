import Axios from "axios"

export function LoginRequest(user, history) {
  return async () => {
    try {
      const res = await Axios.post("https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap", user);
      if (res.status === 200 || res.status === 201) {
        const objdata = res.data;
        console.log(objdata.maNhom);
        if (objdata.maLoaiNguoiDung !== "QuanTri" || objdata.maNhom !== "GP05") {
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
export function GetUserList() {
  return async (dispatch) => {
    try {
      const res = await Axios.get("https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?maNhom=GP05");
      if (res.status === 200 || res.status === 201) {
        dispatch(getUserListSuccess(res.data));
      }
    }
    catch (error) {
      console.log(error);
      dispatch(getUserListFailed(error));
    }
  }
}

function getUserListSuccess(userList) {
  return {
    type: "GET_USER_LIST_SUCCESS",
    payload: userList,
  };
}

function getUserListFailed(error) {
  return {
    type: "GET_USER_LIST_FAILED",
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
        dispatch(GetUserList());
      }
      else {
        alert('Đã xảy ra lỗi trong quá trình thêm dữ liệu.!');
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}

// Cập nhật một user
export function UpdateUser(data) {
  return async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        data,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        }
      });
      if (res.status === 200 || res.status === 201) {
      }
      else {
        alert('Đã xảy ra lỗi trong quá trình cập nhật dữ liệu.!');
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}

// Xóa một user
export function DeleteUser(maPhim) {
  return async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung",
        data: {
          maPhim
        },
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        }
      });
      if (res.status === 200 || res.status === 201) {
      }
      else {
        alert('Đã xảy ra lỗi trong quá trình xóa dữ liệu.!');
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}
