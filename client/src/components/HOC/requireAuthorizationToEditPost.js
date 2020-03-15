import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
// import { fetchCurrentUser, fetchPost } from "../../actions";
import { errorToastStyle } from "../../styles/toastifyStyles";
// import PostsList from "../posts/PostsList";

export default WrappedComponent => {
  class RequireAuthorizationToEditPost extends Component {
    // which life cycle method  is best to use here?

    shouldComponentUpdate(nextProps) {
      
        if (
          nextProps.post &&
          nextProps.current_user._id !== nextProps.post.user.id
        ) {
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
      post: posts.post
    };
  };
  // return connect(mapStateToProps, { fetchCurrentUser, fetchPost })(
  //   RequireAuthorizationToEditPost
  // );
  return connect(mapStateToProps)(RequireAuthorizationToEditPost);
  //   return connect(mapStateToProps, { fetchCurrentUser })(
  //     withRouter(RequireAuth)
  //   );
};
