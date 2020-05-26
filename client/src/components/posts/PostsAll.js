import React, { Component } from "react";
import { connect } from "react-redux";
import PostsList from "./PostsList";
// import PostListFilters from "./PostListFilters";
import { fetchPosts, setSpinner } from "../../actions";
import filterPosts from "../../selectors/filterPosts";
// import Spinner from "../Spinner"
class PostsAll extends Component {
  async componentDidMount() {
    console.log(this.props)
   await this.props.setSpinner();
   await  this.props.fetchPosts(this.props.history);
   this.props.setSpinner(false);
  }
  render() {
    // strange behavior, find out
    // if (this.props.posts) {
    //   filterPosts(this.props.posts, this.props.sortBy, this.props.findByTitle);
    // }

    return (
      <div className="">
        {this.props.posts && (
          <>
            {/* <PostListFilters /> */}
            <PostsList posts={this.props.posts} isLoading={this.props.isLoading}/>
         
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ spinner, posts, filters: { sortBy, findByTitle } }) => {
  console.log(spinner)
  // console.log(posts.posts);
  return {
    // current_user: auth.current_user
    sortBy,
    findByTitle,
    isLoading: spinner.isLoading,
    posts: filterPosts(posts.posts, sortBy, findByTitle),
  };
};
export default connect(mapStateToProps, { fetchPosts, setSpinner })(PostsAll);
