import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { fetchCurrentUser } from "../../actions";
import { connect } from "react-redux";


export default WrappedComponent => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.current_user) {
        this.props.history.push("/");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth }) => {
    return {
      current_user: auth.user
    };
  };
  return connect(mapStateToProps, { fetchCurrentUser })((withRouter(RequireAuth)));
};
