import { FETCH_ALL_POLLS, FETCH_POLL, FETCH_USER_POLLS, VOTE_POLL, CREATE_POLL, DELETE_POLL } from '../actions/types.js';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_ALL_POLLS:
            return { ...state, data: action.payload };
        case FETCH_POLL:
            return { ...state, data: action.payload };
        case FETCH_USER_POLLS:
            return { ...state, data: action.payload };
        /*case VOTE_POLL:
            return { ...state };*/
        case CREATE_POLL:
            return { ...state, data: action.payload  };
        /*case DELETE_POLL:
            return { ...state };*/
    }
    return state;
}
