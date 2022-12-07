import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    featuredGames: [],
    status: "idle",
    error: null,
};

export const fetchFeaturedGames = createAsyncThunk(
    "featuredGames/fetchFeaturedGames",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://i-games-backend.vercel.app/api/games/random");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const featuredGamesSlice = createSlice({
    name: "featuredGames",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchFeaturedGames.pending, (state, action) => {
                return { ...initialState, status: "loading" };
            })
            .addCase(fetchFeaturedGames.rejected, (state, action) => {
                return { ...initialState, status: "failed", error: action.payload };
            })
            .addCase(fetchFeaturedGames.fulfilled, (state, action) => {
                return { ...initialState, status: "succeeded", featuredGames: action.payload };
            });
    },
});

// Selectors
export const selectAllFeaturedGames = (state) => state.featuredGames.featuredGames;
export const getFeaturedGamesStatus = (state) => state.featuredGames.status;
export const getFeaturedGamesError = (state) => state.featuredGames.error;

// Export reducer
export default featuredGamesSlice.reducer;
