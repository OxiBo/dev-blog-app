import React, { Component } from "react";
import { connect } from "react-redux";
// import { reduxForm } from "redux-form";
import NewCommentForm from "./NewCommentForm";
import { editComment } from "../../actions";

class EditComment extends Component {
  onSubmit = values => {
    // console.log(values);
    this.props.onCancel();
    // console.log(values);
    this.props.editComment(values, this.props.comment._id, this.props.post._id);
  };

  render() {
    return (
      <div>
        <NewCommentForm
          form={"editCommentForm"}
          onSubmit={this.onSubmit}
          initialValues={this.props.comment}
          onCancel={this.props.onCancel}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, posts }) => {
  return {
    current_user: auth.current_user,
    post: posts.post
  };
};

export default connect(mapStateToProps, { editComment })(EditComment);
