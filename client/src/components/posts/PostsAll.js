import React, { Component } from "react";
import { connect } from "react-redux";
import PostsList from "./PostsList";
import PostListFilters from "./PostListFilters";
import { fetchPosts } from "../../actions";
import filterPosts from "../../selectors/filterPosts";

class PostsAll extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    // strange behavior, find out
    // if (this.props.posts) {
    //   filterPosts(this.props.posts, this.props.sortBy, this.props.findByTitle);
    // }

    return (
      <div className="container-fluid">
        {this.props.posts && (
          <>
            <PostListFilters />
            <PostsList posts={this.props.posts} />
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ posts, filters: { sortBy, findByTitle } }) => {
  console.log(posts.posts);
  return {
    // current_user: auth.current_user
    sortBy,
    findByTitle,
    posts: filterPosts(posts.posts, sortBy, findByTitle),
  };
};
export default connect(mapStateToProps, { fetchPosts })(PostsAll);
