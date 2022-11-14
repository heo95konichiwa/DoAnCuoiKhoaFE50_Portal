const initialState = {
  movieList: null,
  movieInfo: { tenPhim: '', biDanh: '', trailer: '', hinhAnh: '', moTa: '', maNhom: 'GP01', ngayKhoiChieu: '', danhGia: 0 },
  movieError: null,
};

const movieReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    // get list movie
    case "GET_DATA_LIST_SUCCESS": {
      return { ...state, movieList: payload };
    }
    case "GET_DATA_LIST_FAILED": {
      return { ...state, movieError: payload };
    }

    // get movie
    case "GET_DATA_SUCCESS": {
      return { ...state, movieInfo: payload };
    }
    case "GET_DATA_FAILED": {
      return { ...state, movieError: payload };
    }

    //delete movie
    case "DELETE_DATA_LIST_SUCCESS": {
      const newData = state.movieList.items.filter((movie) => movie.maPhim !== payload);
      return { ...state, movieList: newData };
    }
    case "DELETE_DATA_LIST_FAILED": {
      return { ...state, movieError: payload };
    }
    default:
      return state;
  }
};

export default movieReducer;