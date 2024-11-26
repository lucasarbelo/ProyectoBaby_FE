import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imagenes: []
}

export const imagenesSlice = createSlice({
    name: "imagenes",
    initialState,
    reducers: {
        guardarImagenes: (state, action) => {
            //immer
            state.imagenes = action.payload;
        },
        guardarImagen: (state, action) => {
            state.imagenes.push(action.payload);
        },
    }
})

export const { guardarImagenes , guardarImagen } = imagenesSlice.actions;
export default imagenesSlice.reducer;