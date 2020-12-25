import Axios from "axios"

// Lấy danh sách phim
export function GetMovieList() {
  return async (dispatch) => {
    try {
      const res = await Axios.get("https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05");
      if (res.status === 200 || res.status === 201) {
        dispatch(getMovieListSuccess(res.data));
      }
    }
    catch (error) {
      console.log(error);
      dispatch(getMovieListFailed(error));
    }
  }
}

function getMovieListSuccess(movieList) {
  return {
    type: "GET_MOVIE_LIST_SUCCESS",
    payload: movieList,
  };
}

function getMovieListFailed(error) {
  return {
    type: "GET_MOVIE_LIST_FAILED",
    payload: error,
  };
}

// Thêm một phim mới
export function InsertMovie(data) {
  return async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(data);
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
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
    }
  }
}

// Cập nhật một phim
export function UpdateMovie(data) {
  return async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim",
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

// Xóa một phim
export function DeleteMovie(maPhim) {
  return async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim",
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
