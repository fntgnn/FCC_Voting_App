import axios from 'axios';
import { browserHistory } from 'react-router';
import { FETCH_ALL_POLLS, FETCH_POLL, FETCH_USER_POLLS, VOTE_POLL, CREATE_POLL, DELETE_POLL, CUSTOM_OPTION } from '../actions/types.js';
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

export function fetchUserPolls(user){
  return function(dispatch){
    const id = user._id;
    axios.get(`${config.db_uri}/user/${id}`)
    .then( response => {
      dispatch({ type: FETCH_USER_POLLS, payload: response.data });
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

export function createPoll({ poll, user }){
  const sendPoll = {poll, user};
  return function(dispatch){
    axios.post(`${config.db_uri}/poll/new`,
        sendPoll,
        {
          headers: {authorization: localStorage.getItem('token')}
        })
    .then( response => {
      dispatch({ type: CREATE_POLL, payload: response.data });
    })
    .catch( error => console.log("error ",error));

  }

}

export function deletePoll(id){
  return function(dispatch){
    axios.delete(`${config.db_uri}/poll/${id}`, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then( response => {
        dispatch({ type: DELETE_POLL });
      })
      .catch( error => console.log("error ",error));
  }
}

export function addCustomOption(id, option){
  return function(dispatch){
    axios.post(`${config.db_uri}/poll/${id}/custom`, { option }, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then( response => {
        dispatch({ type: CUSTOM_OPTION });
      })
      .catch( error => console.log("error ",error));
  }
}
