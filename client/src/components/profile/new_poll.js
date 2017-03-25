import React, { Component } from 'react';
import * as actions from '../../actions/polls_actions';
import { connect } from 'react-redux';

class NewPoll extends Component{

  constructor(props){
    super(props);
    this.state={
      name: '',
      options: [
        {option: '', votes: 0},
        {option: '', votes: 0},
      ],
    };
  }

  handleFormSubmit(event){
    event.preventDefault();
    this.props.createPoll({ poll: this.state, user: this.props.user._id });
  }


  appendOption(event){
    event.preventDefault();
    var options = this.state.options;
    options.push({option: '', votes: 0});
    this.setState({ options });
  }

  removeOption(event){
    event.preventDefault();
    var options = this.state.options;
    options.pop();
    this.setState({ options });
  }

  handleTitleChange(event){
    const name = event.currentTarget.value;
    this.setState({ name });
  }

  handleOptionChange(i, event){
    const name = event.currentTarget.value;
    var options = this.state.options;
    options[i].option = name;
    this.setState({ options });
  }


  renderOptions(){
    const options = this.state.options.map((item, i) => {
      return (<input key={i} value={this.state.options[i].option} className="form-control" placeholder="Option..." style={{margin: '5px'}} onChange={this.handleOptionChange.bind(this, i)}/>);
    });
    return options;
  }

  render(){
    return(
      <div className="text-center">
      <form>
      <div className="form-group">
        <label>Question:</label>
        <input value={this.state.options.name} className="form-control" onChange={this.handleTitleChange.bind(this)}/>
      </div>
      <div className="form-group">
        <label>Options:</label>
        {this.renderOptions()}
        <button type="submit" className="btn btn-default" onClick={this.appendOption.bind(this)}>Insert another option</button>
        <button type="submit" className="btn btn-default" onClick={this.removeOption.bind(this)}>Remove last option</button>
      </div>
      <button type="submit" className="btn btn-success" onClick={this.handleFormSubmit.bind(this)}>Submit</button>

      </form>
      </div>
    );
  }
}


function mapStateToProps(state){
  return{
    user: state.auth.user
  }
}

export default connect(mapStateToProps, actions)(NewPoll);
