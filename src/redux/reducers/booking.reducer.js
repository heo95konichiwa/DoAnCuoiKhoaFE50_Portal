const initialState = {
  danhSachGhe: [],
};

function bookingReducer(state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case "GET_BOOKING_SUCCESS": {
      return { ...state, danhSachGhe: payload.danhSachGhe };
    }
    case "CHON_GHE": {
      const index = state.danhSachGhe.findIndex(
        (ghe) => ghe.maGhe === payload.maGhe
      );
      const gheCU = state.danhSachGhe[index];
      const gheMoi = { ...gheCU, dangChon: !gheCU.dangChon };
      state.danhSachGhe[index] = gheMoi;
      const danhSachGhe = [...state.danhSachGhe];
      return { ...state, danhSachGhe };
    }
    default:
      return state;
  }
}

export default bookingReducer;
