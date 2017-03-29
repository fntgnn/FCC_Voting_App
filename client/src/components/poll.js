import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

import { connect } from 'react-redux';
import * as actions from '../actions/polls_actions';


class Poll extends Component {

  static contextTypes = {
    router: PropTypes.object
  }


  constructor(props) {
    super(props);
    this.state = {
      option: 0,
      custom: false,
      customOption: ''
    };
  }

  isAuthenticated(){
    if(localStorage.getItem('token'))
      return true;
    else {
      return false;
    }
  }

  componentWillMount(){
    this.props.fetchPoll(this.props.params.id);
  }

  renderOptions(){
    if (!this.props.poll || !this.props.poll.options) return <option></option>;
    var options = this.props.poll.options.map((item, i) => {
      return (<option key={i} value={i}> {item.option} </option>);
    });
    if(this.isAuthenticated()){
      options.push(<option key={'custom'} value="custom"> Insert a custom option</option>);
    }
    return options;
  }

  handleFormSubmit(event){
    event.preventDefault();
    if(this.state.custom === false)
      this.props.votePoll(this.props.params.id, this.state.option);
    else{
      console.log("Boia can!");
      this.props.addCustomOption(this.props.params.id, this.state.customOption);
    }
    browserHistory.push(`/poll/${this.props.params.id}/voted`);
  }

  onChangeHandler(event){
    this.setState({
      option: event.target.value
    })
    if(event.target.value === 'custom'){
      this.setState({
        custom: true
      })
    }
    else{
      this.setState({
        custom: false
      })
    }
  }

  handleCustomOptionChange(event){
    const customOption = event.currentTarget.value;
    this.setState({ customOption });
  }

  customOption(){
    if(this.state.custom === true){
      return (
        <input value={this.state.customOption} className="form-control" placeholder="Insert a custom option..." onChange={this.handleCustomOptionChange.bind(this)} style={{ marginTop: '10px'}}/>
      );
    }

  }

  render(){

    if(!this.props.poll) return <div></div>;
    const { poll } = this.props;
    return(
      <div className="text-center">
          <h2>{poll.name}</h2>
          <form className="form-group" onSubmit={this.handleFormSubmit.bind(this)}>
            <label>Select list:</label>
            <select value={this.state.option} className="form-control" name="options" onChange={this.onChangeHandler.bind(this)}>
              {this.renderOptions()}
            </select>
            {this.customOption()}
            <button className="btn btn-success" style={{margin: '5px'}} type="submit">Vote!</button>
          </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    poll: state.polls.data,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, actions)(Poll);
