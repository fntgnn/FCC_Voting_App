import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions/user_actions';

import NewPoll from './profile/new_poll';

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
      Benvenuto {this.props.user.name}!!!<br />
      <div className="jumbotron text-center">
        <h2>My polls</h2> <br />
        <button className="btn btn-success" style={{margin: '5px'}} onClick={this.renderNewPoll.bind(this)}>New Poll</button>
        <Link to="#" className="btn btn-primary" style={{margin: '5px'}}>My Polls</Link>
      </div>
      <NewPoll />
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
