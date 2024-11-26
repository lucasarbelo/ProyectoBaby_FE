import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ultimoPanal:null,
    paniales: []
}

export const panialSlice = createSlice({
    name: "panial",
    initialState,
    reducers: {
        setTiempoUltimoPanial: (state, action) => {
            state.ultimoPanal = action.payload;
        },
        setUltimosPanales: (state, action) => {
            state.paniales.push(action.payload); // Añadimos el tiempo del biberón al array
        }
    }
})

export const { setTiempoUltimoPanial , setUltimosPanales} = panialSlice.actions;
export default panialSlice.reducer;