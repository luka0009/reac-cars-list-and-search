import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  data: [],
};

const cars =
  localStorage.getItem("cars") !== null
    ? JSON.parse(localStorage.getItem("cars"))
    : initialState;

const carsSlice = createSlice({
  name: "cars",
  initialState: cars,
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    addCar(state, action) {
      state.data?.push({
        name: action.payload.name,
        cost: action.payload.cost,
        id: nanoid(),
      });
      if (initialState) localStorage.setItem("cars", JSON.stringify(state));
    },
    removeCar(state, action) {
      const updated = state.data.filter((car) => {
        return car.id !== action.payload;
      });
      state.data = updated;
      localStorage.setItem("cars", JSON.stringify(state));
    },
  },
});

export const { changeSearchTerm, addCar, removeCar, editCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
