import React, { Component } from "react";
import { reduxForm } from "redux-form";
import NewCommentForm from "./NewCommentForm";
class NewComment extends Component {
  onSubmit = values => {
    console.log(values);
  };
  render() {
    return (
      <div>
        <NewCommentForm 
        test={'it is test'}
        onSubmit={this.onSubmit} />
      </div>
    );
  }
}


export default reduxForm({form: "newComment"})(NewComment)