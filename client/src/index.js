import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reduxThunk from 'redux-thunk';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Profile from './components/profile';
import Poll from './components/poll';
import PollAfterVote from './components/poll-after-vote';

import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER, GET_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
//se aggiorno, mi fa il signout (quasi)
const token = localStorage.getItem('token');

//if we have a token, consider the user signed in
if(token){
  //we need update application state. Quindi chiamiamo un actionCreator
  store.dispatch({ type: AUTH_USER });

}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
        <Route path="/" component={App} >
            <IndexRoute component={Welcome} />
            <Route path="poll/:id" component={Poll} />
            <Route path="poll/:id/voted" component={PollAfterVote} />
            <Route path="signin" component={Signin} />
            <Route path="signup" component={Signup} />
            <Route path="signout" component={Signout} />
            <Route path="profile" component={RequireAuth(Profile)} />
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
