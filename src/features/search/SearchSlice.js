import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredGames: [],
    searchMode: false,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        populateFilteredGames: (state, action) => {
            const games = [];
            action.payload.category.forEach((game) => {
                if (game.name.toLowerCase().includes(action.payload.search)) {
                    games.push(game);
                }
            });
            state.filteredGames = games;
        },
        removeFromFilteredGames: (state, action) => {
            state.filteredGames = state.filteredGames.filter((game) => game._id !== action.payload);
        },
        clearFilteredGames: (state) => {
            state.filteredGames = [];
        },
        searchModeOn: (state) => {
            state.searchMode = true;
        },
        searchModeOff: (state) => {
            state.searchMode = false;
        },
    },
});

// Selectors
export const selectFilteredGames = (state) => state.search.filteredGames;
export const selectSearchMode = (state) => state.search.searchMode;

// Actions
export const { populateFilteredGames, removeFromFilteredGames, clearFilteredGames, searchModeOn, searchModeOff } =
    searchSlice.actions;

// Slice Reducer
export default searchSlice.reducer;
