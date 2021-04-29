import { combineReducers, createStore } from 'redux';
import { themeReducer, userReducer } from './reducers';

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

export default store;