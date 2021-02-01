const initialState = {
    movieList: [],
    cinemaSystem:null,
    listTheater:null
  };
  
  const showtimeReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
      // get list movie
      case "GET_LIST_MOVIE_ADMIN": {
        return { ...state, movieList: payload };
      }
      case 'GET_LIST_CINEMA_SYSTEM_ADMIN': {
          return {...state,cinemaSystem:payload};
      }
      case 'GET_LOCATION_MOVIE_ADMIN': {
        return {...state,listTheater:payload};
    }
      default:
        return state;
    }
  };
  
  export default showtimeReducer;