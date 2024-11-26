import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ultimoBiberon:null,
    biberones: [],
    anteUltimoBiberon:null
}

export const biberonSlice = createSlice({
    name: "biberon",
    initialState,
    reducers: {
        setTiempoUltimoBiberon: (state, action) => {
            state.ultimoBiberon = action.payload;
        },
        setUltimosBiberones: (state, action) => {
            state.biberones.push(action.payload); // Añadimos el tiempo del biberón al array
        },
        eliminarUltimoBiberon: (state, action) => {
            const id = action.payload;
            state.biberones = state.biberones.filter(bib => bib.id !== id);
        },
        setAnteUltimoBiberon: (state, action) => {
            state.anteUltimoBiberon = action.payload;
        },
        resetBiberones: (state, action) => {
            console.log(action.payload);
            state.biberones = [];
            state.ultimoBiberon = null;
            state.anteUltimoBiberon = null;
        }
    }
})

export const { setTiempoUltimoBiberon , setUltimosBiberones , eliminarUltimoBiberon , setAnteUltimoBiberon, resetBiberones} = biberonSlice.actions;
export default biberonSlice.reducer;