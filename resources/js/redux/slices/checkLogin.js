import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoggedIn: false
};

const checkLogin = createSlice({
    name: 'checkLogin',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
        setLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const { login, logout, setLoginStatus } = checkLogin.actions;
export default checkLogin.reducer;

export const checkTokenValidity = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(setLoginStatus(false));
            return;
        }
        const response = await axios.get(`${appUrl}/api/check-auth`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(setLoginStatus(response.data.data || false));
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            dispatch(setLoginStatus(false));
        }
    }
};
