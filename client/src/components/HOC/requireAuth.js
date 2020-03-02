import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { fetchCurrentUser } from "../../actions";
import { errorTostStyle } from "../../styles/toastifyStyles";

export default WrappedComponent => {
  class RequireAuth extends Component {
      // what is best to use here
    shouldComponentUpdate(nextProps) {
      if (!nextProps.current_user) {
        toast("You have to be logged in to see this page!", errorTostStyle);
        this.props.history.push("/");
      }
      return true;
    }

    // componentWillUpdate has been deprecated
    // componentWillUpdate(nextProps) {
    //   if (!nextProps.current_user) {
    //     toast("You have to be logged in to see this page!", errorTostStyle);
    //     this.props.history.push("/");
    //   }
    // }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth }) => {
    return {
      current_user: auth.user
    };
  };
  return connect(mapStateToProps, { fetchCurrentUser })(
    withRouter(RequireAuth)
  );
};
