import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { fetchCurrentUser } from "../../actions";
import { errorTostStyle } from "../../styles/toastifyStyles";

export default WrappedComponent => {
  class RequireAuthorization extends Component {
    componentDidMount() {
      console.log(this.props);
    }

    // which life cycle method  is best to use here?
    shouldComponentUpdate(nextProps) {
      console.log(
        nextProps.current_user._id !== this.props.match.params.userId
      );
      if (nextProps.current_user._id !== this.props.match.params.userId) {
        toast("You are not authorized to see this page!", errorTostStyle);
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
      current_user: auth.current_user
    };
  };
  return connect(mapStateToProps, { fetchCurrentUser })(RequireAuthorization);

  //   return connect(mapStateToProps, { fetchCurrentUser })(
  //     withRouter(RequireAuth)
  //   );
};
