import { FETCH_ALL_POLLS, FETCH_POLL, VOTE_POLL } from '../actions/types.js';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_ALL_POLLS:
            return { ...state, data: action.payload };
        case FETCH_POLL:
            return { ...state, data: action.payload };
        case VOTE_POLL:
            return { ...state };
    }
    return state;
}
