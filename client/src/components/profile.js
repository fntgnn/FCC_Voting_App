import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/user_actions';

class Profile extends Component{

  componentWillMount(){
    this.props.fetchMessage();
    this.props.getUserFromToken();
  }

  render(){
    if(!this.props.user) return (<div></div>);
    return (
      <div>
      Benvenuto {this.props.user.name}!!!<br />
      </div>);
  }
}

function mapStateToProps(state){
  return{
    message: state.auth.message,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, actions)(Profile);
