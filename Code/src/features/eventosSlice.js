import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ultimoBiberon:null,
    eventos: []
}

export const eventosSlice = createSlice({
    name: "eventos",
    initialState,
    reducers: {
        guardarEventos: (state, action) => {
            //immer
            state.eventos = action.payload;
        },
        guardarEvento: (state, action) => {
            state.eventos.push(action.payload);
        },
        eliminarEvento: (state, action) => {
            const id = action.payload;
            state.eventos = state.eventos.filter(evt => evt.id !== id);
        },
        setUltimo: (state, action) => {
            //state.ultimoBiberon = state.eventos.find(evt => evt.idCategoria == 35);
            state.ultimoBiberon = action.payload;
        },
    }
})

export const { guardarEventos, guardarEvento, eliminarEvento , setUltimo } = eventosSlice.actions;
export default eventosSlice.reducer;