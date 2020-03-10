import React, { Component } from "react";
import { connect } from "react-redux";
import PostsList from "./PostsList";
import { fetchPosts } from "../../actions";

class PostsAll extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <div className="container-fluid">
        {this.props.posts && <PostsList posts={this.props.posts} />}
      </div>
    );
  }
}
const mapStateToProps = ({ posts }) => {
  return {
    // current_user: auth.current_user
    posts: posts.posts
  };
};
export default connect(mapStateToProps, { fetchPosts })(PostsAll);
