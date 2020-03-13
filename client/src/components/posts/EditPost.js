import React, { Component } from "react";
import PostCreateForm from "./PostCreateForm";
import { fetchPost, editPost } from "../../actions";
import { connect } from "react-redux";

class EditPost extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postId);
  }

  onSubmit = values => {
    console.log("edit form submited");
    console.log(values);
    this.props.editPost(values, this.props.match.params.postId);
    this.props.history.push(`/posts/show/${this.props.match.params.postId}`);
  };

  render() {
    return (
      <div>
        <PostCreateForm
          form={"editPost"}
          initialValues={this.props.post}
          onSubmit={this.onSubmit}
          formTitle={true}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    post: posts.post
  };
};

export default connect(mapStateToProps, { fetchPost, editPost })(EditPost);
