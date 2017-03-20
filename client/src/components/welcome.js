import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import * as actions from '../actions/polls_actions';

class Welcome extends Component {

  componentWillMount(){
    this.props.fetchAllPolls();
  }

  renderPolls(){
    if (!this.props.polls) return <div></div>;
    const polls = this.props.polls.map(item => {
      return <li key={item._id} className="list-group-item"><Link to={`poll/${item._id}`}>{item.name}</Link></li>;
    });
    return polls;
  }

  render(){
    return(
      <div className="jumbotron text-center">
      <h1>Polls</h1>
      <ul className="list-group">
        {this.renderPolls()}
      </ul>
      </div>
    );
  }
}


function mapStateToProps(state){
  return{
    polls: state.polls.data
  }
}

export default connect(mapStateToProps, actions)(Welcome);
