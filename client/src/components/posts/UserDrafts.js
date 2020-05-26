import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, fetchUserPosts, setSpinner } from "../../actions";
// import PostCompact from "./PostCompact";
// import PostListFilters from "./PostListFilters";
import PostsList from "./PostsList";
import Spinner from "../Spinner";

class UserDrafts extends Component {
  async componentDidMount() {
   await this.props.fetchUser(this.props.match.params.userId);
    await this.props.setSpinner()
    await this.props.fetchUserPosts(
      this.props.match.params.userId,
      this.props.history,
      false
    );
    this.props.setSpinner(false)
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        {this.props.user_drafts && (
          <>
            {/* <PostListFilters /> */}
            <PostsList posts={this.props.user_drafts} like={false} isLoading={this.props.isLoading}/>
          </>
        ) }
      </div>
    );
  }
}

const mapStateToProps = ({ posts, spinner }) => {
  return {
    // current_user: auth.current_user
    isLoading: spinner.isLoading,
    user_drafts: posts.user_posts,
  };
};
export default connect(mapStateToProps, { fetchUser, fetchUserPosts, setSpinner })(
  UserDrafts
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

==================


: (
          <div className="card m-3">
            <div className="list-group m-2 p-2 text-center">
              You don't have drafts yet
            </div>
          </div>
        )
*/
