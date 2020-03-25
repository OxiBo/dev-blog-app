import React, { Component } from "react";
import { connect } from 'react-redux'
import { reduxForm } from "redux-form";
import NewCommentForm from "./NewCommentForm";
import { submitNewComment } from '../../actions';

class NewComment extends Component {
  onSubmit = values => {
    // console.log(values);
    this.props.submitNewComment(values, this.props.post._id, this.props.current_user._id)
  };
  render() {
    return (
      <div>
        <NewCommentForm 
        form={"newComment"}
        onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, posts }) => {
    return {
        current_user: auth.current_user,
        post: posts.post,

    }
}

export default connect(mapStateToProps, { submitNewComment })(reduxForm({ form: "newComment" })(NewComment));
