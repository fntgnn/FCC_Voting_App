import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/user_actions';

class Signout extends Component{
  componentWillMount(){
    this.props.signoutUser();
  }

    render(){

        return (
        <div>Sorry to se you go...</div>
        );
    }
}

export default connect(null, actions)(Signout);
