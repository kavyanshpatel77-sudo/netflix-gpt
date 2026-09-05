import { createSlice } from "@reduxjs/toolkit";

const Gptslice = createSlice({
    name: "Gptslice",
    initialState: {
        showGptsearch: false,
        movieResults: null,
        movieNames: null
    },
    reducers: {
        toggleGptSearch: (state, action) => {
            state.showGptsearch = !state.showGptsearch;
        },
        addGptMovies: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        }
    }
})
export default Gptslice.reducer;
export const { toggleGptSearch, addGptMovies } = Gptslice.actions;