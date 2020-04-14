import React, { Component } from "react";
import { connect } from "react-redux";
import PostsList from "./PostsList";
import PostListFilters from "./PostListFilters";
import { fetchPosts } from "../../actions";
import filterPosts from "../../selectors/filterPosts"


class PostsAll extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    
  }
  render() {
 
    if(this.props.posts){
      filterPosts(this.props.posts, this.props.sortBy, this.props.findByTitle)
    }

    return (
      <div className="container-fluid">
        <PostListFilters />
        {this.props.posts && <PostsList posts={this.props.posts} />}
      </div>
    );
  }
}
const mapStateToProps = ({ posts, filters: {sortBy, findByTitle} }) => {
  return {
    // current_user: auth.current_user
    sortBy,
    findByTitle,
    posts: posts.posts
  };
};
export default connect(mapStateToProps, { fetchPosts })(PostsAll);
