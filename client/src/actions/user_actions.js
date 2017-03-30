import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, GET_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/types.js';
import config from '../../config';



export function signupUser({ name, email, password }){
  return function(dispatch){
    axios.post(`${config.ROOT_URL}/signup`,{ name, email, password })
    .then( response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/profile');
    })
    .catch( error => dispatch(authError(error.response.data.error)));
  }
}

export function signinUser({ email, password }){
    //action creator ritorna sempre un oggetto. Con reduxThunk ritorna una funzione! Come lavorare nell dispatch
    return function(dispatch){
        //qui possiamo fare quello che vogliamo...chiamate asincrone ecc,... e poi chiamiamo il dispatch({type:'', payload:.......})
        //submit email/password to server
    axios.post(`${config.ROOT_URL}/signin`,{ email, password })
    .then( response =>{
        //ritorna il token...
        //If ok update state to indicated user authenticated, save the jwt token, redirect to feature
        dispatch({ type: AUTH_USER, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/profile');
    })
    .catch( () => {
        dispatch(authError('Bad login info'));
    });


    //If req is bad, show error

    }
}

export function authError(error) {
    return{
        type: AUTH_ERROR,
        payload: error
    }
}


export function signoutUser(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch){
    axios.get(config.ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')}
    })
    .then( response => {
      dispatch( {
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    });
  }
}

export function getUserFromToken(){
  return function(dispatch){
    axios.post(`${config.ROOT_URL}/decode`,{ token: localStorage.getItem('token')})
    .then( response => {
      console.log("Resoponse: ", response);
      dispatch({ type: GET_USER, payload: response.data.user });
      //browserHistory.push('/profile');
    })
    .catch( error => dispatch(authError(error.response.data.error)));
  };
}
