import Axios from "axios";

//lay danh sach phim
export function getMovieListAdminShowtime() {
    return (dispatch) => {
      // call api
      Axios.get(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05"
      )
        .then((res) => {
            dispatch({
                type: "GET-LIST-MOVIE-ADMIN",
                payload: res.data,
              });
        })
        .catch((error) => {
          console.log(error);
        });
    };
}

//lay danh sach he thong he thong rap
export function getCinemaSystem() {
    return(dispatch) =>{
        Axios.get(
            'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap'
        ).then(res=>{
            dispatch({
                type: "GET-LIST-CINEMA-SYSTEM-ADMIN",
                payload: res.data,
              });
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

//lay thong tin cum rap theo he thong 
export function getLocationMovie(maHeThongRap) {

    return(dispatch) =>{
        Axios.get(
            `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
        ).then(res=>{
            dispatch({
                type: "GET-LOCATION-MOVIE-ADMIN",
                payload: res.data,
              });
        })
        .catch(err=>{
            console.log(err);
        })
    }
}
//tạo lịch chiếu
export function postShowTime(maPhim, ngayChieuGioChieu, GioChieu,maRap,giaVe) {
    console.log(maPhim, ngayChieuGioChieu, GioChieu,maRap,giaVe);
    const ngayGioChieu = `${ngayChieuGioChieu} ${GioChieu}`;
    console.log(ngayGioChieu);
    return async function (dispatch) {
      try {
        // getlocal
        const user = JSON.parse(localStorage.getItem("user"));
 
        // call api
        const res = await Axios({
          method: "POST",
          url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
          data: {
            maPhim,
            ngayChieuGioChieu,
            maRap,
            giaVe,
          },
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        if (res.status === 200 || res.status === 201) {
          alert("Thành công");
        //   history.push('/')
        }
      } catch (error) {}
    };
  }
