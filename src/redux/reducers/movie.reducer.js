const initialState = {
  movieList: null,
  movieInfo: null,
};

const movieReducer = (state = initialState, action) => {
  let { type, payload } = action; // bóc tách ES6
  switch (type) {
    case "GET_MOVIE_lIST_SUCCESS": {
      //   state.movieList = payload;
      //   return { ...state }; // setSate
      return { ...state, movieList: payload };
    }
    case "GET_MOVIE_DETAIL_SUCCESS": {
      return { ...state, movieInfo: payload };
    }
    default:
      return state;
  }
};

export default movieReducer;
