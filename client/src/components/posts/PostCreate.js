import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import PostCreateForm from "./PostCreateForm";
import PostCreateReview from "./PostCreateReview";

class PostCreate extends Component {
  state = {
    showReview: false,
  };
  render() {
    return (
      <div>
        {this.props.current_user ? (
          !this.state.showReview ? (
            <PostCreateForm
             
              onSubmit={() => this.setState({ showReview: true })}
            />
          ) : (
            <PostCreateReview
              onCancel={() => this.setState({ showReview: false })}
            />
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.current_user,
  };
};

export default connect(mapStateToProps)(
  reduxForm({ form: "createPost", destroyOnUnmount: false })(PostCreate)
);
