import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    wishlist: [],
    wishlistStatus: "idle",
    wishlistError: null,
};

export const loadWishlist = createAsyncThunk("wishlist/loadWishlist", async (data, { rejectWithValue }) => {
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

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        clearWishlist: (state) => {
            state.wishlist = [];
            state.wishlistStatus = "idle";
        },
    },
    extraReducers(builder) {
        builder
            // loadWishlist Cases
            .addCase(loadWishlist.pending, (state, action) => {
                return { ...state, wishlistStatus: "loading" };
            })
            .addCase(loadWishlist.rejected, (state, action) => {
                return { ...state, wishlistStatus: "failed", wishlistError: action.payload.response };
            })
            .addCase(loadWishlist.fulfilled, (state, action) => {
                return { ...state, wishlistStatus: "succeeded", wishlist: action.payload.response };
            });
    },
});

// Selectors
export const getWishlist = (state) => state.wishlist.wishlist;
export const getWishlistError = (state) => state.wishlist.wishlistError;
export const getWishlistStatus = (state) => state.wishlist.wishlistStatus;

// Actions
export const { clearWishlist } = wishlistSlice.actions;

// Slice Reducer
export default wishlistSlice.reducer;
