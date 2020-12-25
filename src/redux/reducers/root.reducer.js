import { combineReducers } from "redux";
import movieReducer from "./movie.reducer";
import commonReducer from "./common.reducer";
import bookingReducer from "./booking.reducer";
import userReducer from "./user.reducer";
const rootReducer = combineReducers({
  // child reducer
  movie: movieReducer,
  common: commonReducer,
  booking: bookingReducer,
  users: userReducer,
});

export default rootReducer;
