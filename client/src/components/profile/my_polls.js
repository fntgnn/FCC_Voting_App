import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/polls_actions';

import { browserHistory } from 'react-router';

class MyPolls extends Component{

  componentWillMount(){
    this.props.fetchUserPolls(this.props.user);
  }

  renderPolls(){
    const polls = this.props.polls.map(item => {
      return (
        <li key={item._id} className="list-group-item">
        <span className="badge" onClick={this.deletePoll.bind(this, item._id)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></span>
      {item.name}
      </li>);
    });
    return polls;
  }

  deletePoll(id){
    this.props.deletePoll(id);
    browserHistory.push('/profile');
  }

  render(){
    if(!this.props.polls) return (<div></div>);
    return(
      <div>

      <ul className="list-group">
      {this.renderPolls()}
    </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    polls: state.polls.data,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, actions)(MyPolls);
