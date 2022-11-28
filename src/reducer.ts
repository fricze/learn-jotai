import { createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux'

export const countReducer = function(state = 0, action: AnyAction) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
};


export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';

const userState = {
    form: {
        email: "",
        password: "",
    }
}

export function setEmailAction(email: string) {
    return { type: SET_EMAIL, payload: email }
}

export function setPasswordAction(password: string) {
    return { type: SET_PASSWORD, payload: password }
}

export const userReducer = function(state = userState, action: AnyAction) {
    switch (action.type) {
        case SET_EMAIL:
            return { ...state, form: { ...state.form, email: action.email } };
        case SET_PASSWORD:
            return { ...state, form: { ...state.form, password: action.password } };
        default:
            return state;
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setEmail: (state, action) => {
            state.form.email = action.payload;
        },
        setPassword: (state, action) => {
            state.form.password = action.payload;
        }
    }
})

export const { setEmail, setPassword } = userSlice.actions;
