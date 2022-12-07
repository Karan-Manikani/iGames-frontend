import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    games: [],
    page: 1,
    status: "idle",
    error: null,
    totalPages: 1,
};

// Async thunks
export const fetchGames = createAsyncThunk("games/fetchGames", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `https://i-games-backend.vercel.app/api/games?page=${data.page}&search=${data.search || ""}`
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        nextPage: (state) => {
            state.page += 1;
        },
        prevPage: (state) => {
            state.page -= 1;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchGames.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                const { games, totalPages } = action.payload.response;
                return { ...initialState, status: "succeeded", page: state.page, games: games, totalPages: totalPages };
            })
            .addCase(fetchGames.rejected, (state, action) => {
                return { ...initialState, status: "failed", error: action.payload, page: 1 };
            });
    },
});

// Selectors
export const selectAllGames = (state) => state.games.games;
export const getGamesStatus = (state) => state.games.status;
export const getGamesError = (state) => state.games.error;
export const getPageNumber = (state) => state.games.page;
export const getTotalPages = (state) => state.games.totalPages;

// Actions
export const { nextPage, prevPage } = gamesSlice.actions;

// Export reducer
export default gamesSlice.reducer;
