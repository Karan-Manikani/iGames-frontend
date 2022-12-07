import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product: {},
    status: "idle",
    error: null,
};

// Async thunk
export const fetchProductByID = createAsyncThunk("product/fetchProductByID", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`https://i-games-backend.vercel.app/api/games/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProductByID.pending, (state, action) => {
                return { ...initialState, status: "loading" };
            })
            .addCase(fetchProductByID.rejected, (state, action) => {
                return { ...initialState, status: "failed", error: action.payload };
            })
            .addCase(fetchProductByID.fulfilled, (state, action) => {
                return { ...initialState, status: "succeeded", product: action.payload };
            });
    },
});

// Selectors
export const getProduct = (state) => state.product.product;
export const getProductStatus = (state) => state.product.status;
export const getProductError = (state) => state.product.error;

// Slice reducer
export default productSlice.reducer;
