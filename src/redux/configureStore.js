import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import {Dishes} from './dishes';
import {Comments} from './comments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}