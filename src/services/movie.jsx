import Axios from "axios"

// Lấy danh sách movie
const user = JSON.parse(localStorage.getItem("user"));
export function GetDataList(searchKey, activePage, totalPerPage) {
  return async (dispatch) => {
    let url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01`;
    if (searchKey) url += `&tenPhim=${searchKey}`;
    if (activePage) url += `&soTrang=${activePage}`;
    if (totalPerPage) url += `&soPhanTuTrenTrang=${totalPerPage}`;
    try {
      const res = await Axios.get(url);
      if (res.status === 200 || res.status === 201) {
        dispatch(getDataListSuccess(res.data));
      }
    }
    catch (error) {
      console.log(error.response);
      dispatch(getDataListFailed(error));
      if (error.response) alert(error.response.data);
    }
  }
}

export function getDataListSuccess(dataList) {
  return {
    type: "GET_DATA_LIST_SUCCESS",
    payload: dataList,
  };
}

export function getDataListFailed(error) {
  return {
    type: "GET_DATA_LIST_FAILED",
    payload: error,
  };
}

// Lấy một movie
export function GetData(maPhim) {
  return async (dispatch) => {
    try {
      const res = await Axios({
        method: "GET",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
      });
      if (res.status === 200 || res.status === 201) {
        dispatch(getDataSuccess(res.data));
      }
    }
    catch (error) {
      console.log(error.response);
      dispatch(getDataFailed(error));
      if (error.response) alert(error.response.data);
    }
  }
}

export function getDataSuccess(maPhim) {
  return {
    type: "GET_DATA_SUCCESS",
    payload: maPhim,
  };
}

export function getDataFailed(error) {
  return {
    type: "GET_DATA_FAILED",
    payload: error,
  };
}

// Thêm một movie mới
export function InsertData(data) {
  return async () => {
    try {
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
      if (error.response) alert(error.response.data);
    }
  }
}

// Cập nhật một movie
export function UpdateDataImage(data) {
  return async (dispatch) => {
    try {
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
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

// Cập nhật một movie
export function UpdateData(data) {
  return async (dispatch) => {
    try {
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim",
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

// Xóa một movie
export function DeleteData(maPhim, tenPhim) {
  return async (dispatch) => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?maPhim=${maPhim}`,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        }
      });
      if (res.status === 200 || res.status === 201) {
        dispatch(deleteDataListSuccess(maPhim));
        alert(`Xóa thành công phim ${tenPhim} khỏi hệ thống.!`);
      }
      else {
        alert('Đã xảy ra lỗi trong quá trình xóa dữ liệu.!');
      }
      //console.log(res.status);
    }
    catch (error) {
      //console.log(error);
      dispatch(deleteDataListFailed(error));
      if (error.response) alert(error.response.data);
    }
  }
}

export function deleteDataListSuccess(maPhim) {
  return {
    type: "DELETE_DATA_LIST_SUCCESS",
    payload: maPhim,
  };
}

export function deleteDataListFailed(error) {
  return {
    type: "DELETE_DATA_LIST_FAILED",
    payload: error,
  };
}