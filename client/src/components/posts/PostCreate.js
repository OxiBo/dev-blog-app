import React, { Component } from "react";
import { reduxForm } from "redux-form"
import PostCreateForm from "./PostCreateForm";
import PostCreateReview from "./PostCreateReview";

class PostCreate extends Component {
  state = {
    showReview: false
  };
  render() {
    return (
      <div>
        {!this.state.showReview ? (
          <PostCreateForm
            onSubmit={() => this.setState({ showReview: true })}
          />
        ) : (
          <PostCreateReview
            onCancel={() => this.setState({ showReview: false })}
          />
        )}
      </div>
    );
  }
}

export default reduxForm({ form: "createPost"})(PostCreate);
