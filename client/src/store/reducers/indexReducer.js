import {combineReducers} from 'redux';
import user from './userReducer';
import worker from './workerReducer';

export default combineReducers({
    user,
    worker,
});