import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';



class Header extends Component{

    renderLinks(){
      if(this.props.authenticated){
        return [
          <li className="navbar-item" key={1}><Link className="nav-link" to="/settings"><i className="fa fa-cog" aria-hidden="true"></i></Link></li>,
          <li className="navbar-item" key={2}><Link className="nav-link" to="/signout"> Sign Out</Link></li>
        ];
      } else {
        return [
          <li className="navbar-item" key={2}><Link className="nav-link" to="/signin"> Sign In</Link></li>,
          <li className="navbar-item" key={3}><Link className="nav-link" to="/signup"> Sign Up</Link></li>
        ];
      }
    }

    render(){
      return(

            <nav className="navbar navbar-light">
            <Link to="/" className="navbar-brand">Voting App</Link>
                <ul className="nav navbar-nav pull-right">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }

}

function mapStateToProps(state){
  return{
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, null)(Header);
