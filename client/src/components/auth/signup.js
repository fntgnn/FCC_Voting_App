import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions/user_actions';

class Signup extends Component{

    /*
    Secondo me era handleFormSubmit
    handleSubmit(formProps){
        //action creator
        this.props.signupUser({ email, password });
    }
    */

    handleFormSubmit({ name, email, password }){
        this.props.signupUser({ name, email, password });
    }

    renderAlert(){
      if(this.props.errorMessage){
        return (
          <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
          </div>
      )
      }
    }



    render(){
        const { handleSubmit, fields: { name, email, password, passwordConfirm }} = this.props;

        return (
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
            <label>Name:</label>
            <input type="text" className="form-control" {...name}/>
              {name.touched && name.error && <div className="error">{name.error}</div>}
            </fieldset>

            <fieldset className="form-group">
            <label>Email:</label>
            <input type="text" className="form-control" {...email}/>
              {email.touched && email.error && <div className="error">{email.error}</div>}
            </fieldset>

            <fieldset className="form-group">
            <label>Password:</label>
            <input type="text" className="form-control" {...password}/>
            {password.touched && password.error && <div className="error">{password.error}</div>}
            </fieldset>

            <fieldset className="form-group">
            <label>Confirm Password:</label>
            <input type="text" className="form-control" {...passwordConfirm}/>
            {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
            </fieldset>
            {this.renderAlert()}
            <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
        );
    }
}

function validate(formProps){
      const errors = {};

      if(!formProps.name){
        errors.name = 'name empty';
      }

      if(!formProps.email){
        errors.email = 'email empty';
      }

      if(!formProps.password){
        errors.password = 'password empty';
      }

      if(!formProps.passwordConfirm){
        errors.passwordConfirm = 'password confimation empty';
      }

      if(formProps.password != formProps.passwordConfirm){
        errors.password = 'password dont match!';
      }

      return errors;
    }

function mapStateToProps(state){
  return { errorMessage: state.auth.error};
}

export default reduxForm({
    form: 'signup',
    fields: ['name', 'email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup)
