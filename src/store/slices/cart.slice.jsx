import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      const cart = action.payload;
      return cart;
    },
  },
});

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, getConfig())
    .then((res) => dispatch(setCart(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addCartThunk = (productToBuy) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      `https://e-commerce-api-v2.academlo.tech/api/v1/cart`,
      productToBuy,
      getConfig()
    )
    .then((res) => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)));
};

export const purchaseThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      `https://e-commerce-api-v2.academlo.tech/api/v1/purchases`,
      getConfig()
    )
    .then(() => dispatch(setCart([])))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
