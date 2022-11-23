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
export const SET_NAME = 'SET_NAME';
export const SET_PASSWORD = 'SET_PASSWORD';

const userState = {
    form: {
        name: "",
        password: "",
    }
}

export function setNameAction(name: string) {
    return { type: SET_NAME, payload: name }
}

export function setPasswordAction(password: string) {
    return { type: SET_PASSWORD, payload: password }
}

export const userReducer = function(state = userState, action: AnyAction) {
    switch (action.type) {
        case SET_NAME:
            return { ...state, form: { ...state.form, name: action.name } };
        case SET_PASSWORD:
            return { ...state, form: { ...state.form, password: action.password } };
        default:
            return state;
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setName: (state, action) => {
            state.form.name = action.payload;
        },
        setPassword: (state, action) => {
            state.form.password = action.payload;
        }
    }
})
