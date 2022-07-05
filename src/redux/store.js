import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import taskReducer from './reducers';

const rootReducers = combineReducers({taskReducer});

export const Store = createStore(rootReducers, applyMiddleware(thunk))