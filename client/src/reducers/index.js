import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import pollsReducer from './polls_reducer';

const rootReducer = combineReducers({
    form,
    auth: authReducer,
    polls: pollsReducer
});

export default rootReducer;
