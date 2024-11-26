import { configureStore } from "@reduxjs/toolkit";
import categoriasReducer from "../features/categoriasSlice";
import eventosReducer from "../features/eventosSlice";
import biberonReducer from "../features/biberonSlice"
import panialReducer from "../features/panalSlice";



export const store = configureStore({
    reducer: {
        categorias:categoriasReducer,
        eventos:eventosReducer,
        biberon:biberonReducer,
        panial:panialReducer,
    }
})

