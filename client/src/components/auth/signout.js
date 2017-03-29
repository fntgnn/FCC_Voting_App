import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/user_actions';

class Signout extends Component{
  componentWillMount(){
    this.props.signoutUser();
  }

    render(){

        return (
        <div className="jumbotron text-center">
        <h1>Sorry to se you go...</h1>
        <a href='/' className="btn btn-success">Back home</a>
        </div>
        );
    }
}

export default connect(null, actions)(Signout);
