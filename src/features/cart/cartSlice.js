import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart: [],
    cartTotal: 0,
    cartStatus: "idle",
    cartError: null,
};

export const loadCart = createAsyncThunk("cart/loadCart", async (data, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "post",
            url: "https://i-games-backend.vercel.app/api/games/multiple",
            headers: {},
            data,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartStatus = "idle";
            state.cart = [];
            state.cartTotal = 0;
        },
    },
    extraReducers(builder) {
        builder
            //  loadCart Cases
            .addCase(loadCart.pending, (state, action) => {
                return { ...state, cartStatus: "loading" };
            })
            .addCase(loadCart.rejected, (state, action) => {
                return { ...state, cartStatus: "failed", cartError: action.payload.response };
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                let newTotal = 0;
                action.payload.response.forEach((item) => (newTotal += item.price));
                return { ...state, cartStatus: "succeeded", cart: action.payload.response, cartTotal: newTotal };
            });
    },
});

// Selectors
export const selectCart = (state) => state.cart.cart;
export const selectCartTotal = (state) => state.cart.cartTotal;
export const selectCartError = (state) => state.cart.cartError;
export const selectCartStatus = (state) => state.cart.cartStatus;

// Actions
export const { clearCart } = cartSlice.actions;

// Slice Reducer
export default cartSlice.reducer;
