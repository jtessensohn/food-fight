import { SET_USER } from "./actions";

export function userReducer(state = null, action) {
    switch(action.type){
        case SET_USER:
            return action.data;
        default:
            return state;
    }
}