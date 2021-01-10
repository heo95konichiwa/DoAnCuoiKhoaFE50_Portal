import { combineReducers } from "redux";
import movieReducer from "./movie.reducer";
import commonReducer from "./common.reducer";
import bookingReducer from "./booking.reducer";
import userReducer from "./user.reducer";
import cinemaReducer from "./cinema.reducer";
import showtimeReducer from './showtimes.reducer'
const rootReducer = combineReducers({
  // child reducer
  movie: movieReducer,
  common: commonReducer,
  booking: bookingReducer,
  users: userReducer,
  cinemaReducer: cinemaReducer,
  showtime:showtimeReducer
});

export default rootReducer;
