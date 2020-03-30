import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
// import { fetchCurrentUser, fetchPost } from "../../actions";
import { errorToastStyle } from "../../styles/toastifyStyles";
// import PostsList from "../posts/PostsList";

export default WrappedComponent => {
  class RequireAuthorizationToSeeDrafts extends Component {
    // which life cycle method  is best to use here?

    shouldComponentUpdate(nextProps) {
      if (this.props.match.params.userId !== nextProps.current_user._id) {
        toast("You are not authorized to see this page!", errorToastStyle);
        nextProps.history.push("/posts");
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

  const mapStateToProps = ({ auth, posts }) => {
    return {
      current_user: auth.current_user,
      user_posts: posts.user_posts
    };
  };
  // return connect(mapStateToProps, { fetchCurrentUser, fetchPost })(
  //   RequireAuthorizationToEditPost
  // );
  return connect(mapStateToProps)(RequireAuthorizationToSeeDrafts);
  //   return connect(mapStateToProps, { fetchCurrentUser })(
  //     withRouter(RequireAuth)
  //   );
};
