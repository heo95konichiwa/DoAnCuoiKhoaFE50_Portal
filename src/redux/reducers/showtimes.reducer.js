const initialState = {
    movieList: [],
    movieInforShowtime:null,
    cinemaSystem:null,
    listTheater:null
  };
  
  const showtimeReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
      // get list movie
      case "GET-LIST-MOVIE-ADMIN": {
        return { ...state, movieList: payload };
      }
      case 'GET-LIST-CINEMA-SYSTEM-ADMIN': {
          return {...state,cinemaSystem:payload};
      }
      case 'GET-LOCATION-MOVIE-ADMIN': {
        return {...state,listTheater:payload};
    }
      case 'GET-INFOR-MOVIE-SHOWTIME': {
        return {...state,movieInforShowtime:payload};
      }
      default:
        return state;
    }
  };
  
  export default showtimeReducer;