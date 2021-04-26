import { SET_TEAM, SET_USER } from "./actions";

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