import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component{
        //devo accedere al router per reindirizzare nel caso in cui nn si fosse loggati
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount(){
            if(!this.props.authenticated)
                this.context.router.push('/');
        }

        componentWillUpdate(nextProps){ //per fare il redirect quando faccio il signout
            if(!nextProps.authenticated)
                this.context.router.push('/');
        }

        render(){
            console.log(this.context)
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state){
        return {
            authenticated: state.auth.authenticated
        }
    }

    return connect(mapStateToProps)(Authentication);
}
