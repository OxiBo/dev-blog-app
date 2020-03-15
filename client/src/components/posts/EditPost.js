import React, { Component } from "react";
import PostCreateForm from "./PostCreateForm";
import { fetchPost, editPost } from "../../actions";
import { connect } from "react-redux";

class EditPost extends Component {
  componentDidMount() {
    // this.props.fetchCurrentUser();// delete?
    // if(this.props.current_user){
    // this.props.fetchPost(this.props.match.params.postId);
    // }
  }

  onSubmit = values => {
    // console.log("edit form submited");
    // console.log(values);
    this.props.editPost(
      values,
      this.props.match.params.postId,
      this.props.history
    );
  };

  render() {
    return (
      <div>
        {this.props.post ? (
          <PostCreateForm
            form={"editPost"}
            initialValues={this.props.post}
            onSubmit={this.onSubmit}
            formTitle={true}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ posts, auth }) => {
  return {
    current_user: auth.current_user,
    post: posts.post
  };
};

export default connect(mapStateToProps, {
  fetchPost,
  editPost
})(EditPost);
