import React, { Component } from "react";
// import { connect } from "react-redux";
// import { fetchUser, fetchUserPosts } from "../../actions";
import PostCompact from "./PostCompact";
import PostListFilters from "./PostListFilters";
class PostsList extends Component {
  render() {
    // console.log(this.props);
    return (
      <>
        {this.props.posts.length ? (
          <>
            <PostListFilters />
            {this.props.posts.map(
              (post) => post._id && <PostCompact key={post._id} post={post} />
            )}
          </>
        ) : (
          <div>Refresh to load posts...</div>
        )}
      </>
    );
  }
}

// const mapStateToProps = ({ posts }) => {
//   return {
//     // current_user: auth.current_user
//     user_posts: posts.user_posts
//   };
// };
export default PostsList;
