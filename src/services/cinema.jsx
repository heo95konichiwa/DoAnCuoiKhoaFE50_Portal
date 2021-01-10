import Axios from "axios"

// Lấy danh sách hệ thống rạp
export function GetDataList() {
  return async (dispatch) => {
    let url = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap`;
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