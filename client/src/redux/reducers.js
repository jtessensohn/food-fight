import { SET_TEAM, SET_USER, TOGGLE_THEME } from "./actions";

export function userReducer(state = null, action) {
    switch(action.type){
        case SET_USER:
            return action.data;
        case SET_TEAM:
            return {...state, TeamId: action.TeamId};
        default:
            return state;
    }
}

export function themeReducer(state = "light", action) {
    switch(action.type){
        case TOGGLE_THEME:
            return state === "light" ? "dark" : "light"
        default:
            return state;
    }
}