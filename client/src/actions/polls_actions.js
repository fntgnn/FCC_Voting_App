import axios from 'axios';
import { browserHistory } from 'react-router';
import { FETCH_ALL_POLLS, FETCH_POLL, VOTE_POLL } from '../actions/types.js';
import config from '../../config';

export function fetchAllPolls(){
  return function(dispatch){
    axios.get(config.db_uri)
    .then( response => {
      dispatch({ type: FETCH_ALL_POLLS, payload: response.data });

    })
    .catch( error => console.log("error ",error));
  }
}

export function fetchPoll(id){
  return function(dispatch){
    axios.get(`${config.db_uri}/poll/${id}`)
    .then( response => {
      dispatch({ type: FETCH_POLL, payload: response.data });

    })
    .catch( error => console.log("error ",error));
  }
}

export function votePoll(id, option){
  return function(dispatch){
    axios.post(`${config.db_uri}/poll/${id}`, { option })
    .then( response => {
      dispatch({ type: VOTE_POLL });
    })
    .catch( error => console.log("error ",error));
  }
}