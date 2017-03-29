import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions/user_actions';


class Profile extends Component{

  componentWillMount(){
    this.props.fetchMessage();
    this.props.getUserFromToken();
  }

  renderNewPoll(){
    console.log("cliccato");
  }

  render(){
    if(!this.props.user) return (<div></div>);
    return (
      <div>
      <div className="jumbotron text-center">
        <h2>My polls</h2> <br />
        <a href="/profile/new" className="btn btn-success" style={{margin: '5px'}}>New Poll</a>
        <a href="/profile/mypolls" className="btn btn-primary" style={{margin: '5px'}}>My Polls</a>
      </div>
      {this.props.children}
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
