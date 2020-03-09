import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, fetchUserPosts } from "../../actions";
import PostCompact from "./PostCompact";

class UserPosts extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserPosts(
      this.props.match.params.userId,
      this.props.history
    );
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.user_posts ? (
          this.props.user_posts.map(post => <PostCompact key={post._id} post={post} />)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    // current_user: auth.current_user
    user_posts: posts.user_posts
  };
};
export default connect(mapStateToProps, { fetchUser, fetchUserPosts })(
  UserPosts
);