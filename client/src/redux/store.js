import { combineReducers, createStore } from 'redux';
import { userReducer } from './reducers';

const rootReducer = combineReducers({
    user: userReducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

export default store;