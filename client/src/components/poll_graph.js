import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

import { connect } from 'react-redux';
import * as actions from '../actions/polls_actions';

import { Pie } from 'react-chartjs-2';


class PollGraph extends Component {

  componentDidMount(){
    this.props.fetchPoll(this.props.params.id);
  }

  renderGraph(){
    if (!this.props.poll || !this.props.poll.options) return <div></div>;
    const labels = this.props.poll.options.map(item => {
      return item.option;
    });
    const values = this.props.poll.options.map(item => {
      return item.votes;
    });
    var poolColors = function(a) {
          var pool = [];
          for(var i=0; i<a; i++){
              pool.push(dynamicColors());
          }
          return pool;
      }

      var dynamicColors = function() {
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          return "rgb(" + r + "," + g + "," + b + ")";
      }
    const data = {
      	labels: labels,
      	datasets: [{
      		data: values,
      		backgroundColor: poolColors(labels.length),

      	}]
      };

      return (
        <div className="text-center img-responsive">
           <Pie data={data} />
        </div>
      );
  }



  render(){
    if(!this.props.poll) return <div></div>;
    const { poll } = this.props;
    return(
      <div className="text-center">
          <h2>{poll.name}</h2>
          {this.renderGraph()}
          <a href='/' className="btn btn-success">Back home</a>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    poll: state.polls.data
  }
}

export default connect(mapStateToProps, actions)(PollGraph);
