import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import * as actions from '../actions/polls_actions';

import { Pie } from 'react-chartjs-2';


class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 0
    };
  }

  componentWillMount(){
    this.props.fetchPoll(this.props.params.id);
  }

  renderOptions(){
    if (!this.props.poll || !this.props.poll.options) return <option></option>;
    const options = this.props.poll.options.map((item, i) => {
      return (<option key={i} value={i}> {item.option} </option>);
    });
    return options;
  }

  handleFormSubmit(event){
    event.preventDefault();
    this.props.votePoll(this.props.params.id, this.state.option);
  }

  onChangeHandler(event){
    this.setState({
      option: event.target.value
    })
  }

  renderGraph(){
    const labels = this.props.poll.options.map(item => {
      return item.option;
    });
    const values = this.props.poll.options.map(item => {
      return item.votes;
    });
    var poolColors = function(a) {
          var pool = [];
          for(var i=0;i<a;i++){
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
    console.log(values);
    const data = {
      	labels: labels,
      	datasets: [{
      		data: values,
      		backgroundColor: poolColors(labels.length),
      		
      	}]
      };

      return (
        <div>
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
        <div className="col-md-6">

          <form className="form-group" onSubmit={this.handleFormSubmit.bind(this)}>
            <label>Select list:</label>
            <select value={this.state.option} className="form-control" name="options" onChange={this.onChangeHandler.bind(this)}>
              {this.renderOptions()}
            </select>
            <button className="btn btn-success" style={{margin: '5px'}} type="submit">Vote!</button>
          </form>
          <br/>
          <button className="btn btn-primary" style={{margin: '5px'}}>Share on twitter</button>
        </div>
        <div className="col-md-6">
          {this.renderGraph()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    poll: state.polls.data
  }
}

export default connect(mapStateToProps, actions)(Poll);
