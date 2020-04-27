import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, fetchUserPosts } from "../../actions";
// import PostCompact from "./PostCompact";
import filterPosts from "../../selectors/filterPosts";
// import PostListFilters from "./PostListFilters";
import PostsList from "./PostsList";

class UserPosts extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserPosts(
      this.props.match.params.userId,
      this.props.history,
      true
    );
  }

  render() {
    // console.log(this.props);
    return (
      <>
     
        {this.props.user_posts.length ? (
          <>
          {/* <PostListFilters /> */}
          <PostsList posts={this.props.user_posts} />
          </>
        ) : (
          <div className="card m-3">
            <div className="list-group m-2 p-2 text-center">
              You don't have posts yet
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ posts, filters: { sortBy, findByTitle } }) => {
  return {
    // current_user: auth.current_user
    sortBy,
    findByTitle,
    user_posts: filterPosts(posts.user_posts, sortBy, findByTitle)
  };
};
export default connect(mapStateToProps, { fetchUser, fetchUserPosts })(
  UserPosts
);

// export default UserPosts;

/*


render() {
    console.log(this.props);
    return (
      <div>
        {this.props.user_posts ? (
          this.props.user_posts.map(post => (
            <PostCompact key={post._id} post={post} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }


*/
