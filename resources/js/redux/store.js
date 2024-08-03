import { configureStore } from "@reduxjs/toolkit";
import checkLogin from "./slices/checkLogin";

const store = configureStore({
    reducer: {
        checkLogin: checkLogin
    }
})

store.subscribe(() => {
    store.getState()
})

export default store