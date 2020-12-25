const initialState = {
  movieList: null,
  movieInfo: null,
};

const movieReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case "GET_MOVIE_LIST_SUCCESS": {
      return { ...state, movieList: payload };
    }
    default:
      return state;
  }
};

export default movieReducer;
