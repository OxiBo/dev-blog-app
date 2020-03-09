import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { submitNewPost } from "../../actions";

class PostCreateReview extends Component {
  onSubmit = values => {
    // console.log(values);
    this.props.submitNewPost(values);
    this.props.history.push(`/user/${this.props.current_user._id}/posts`)
  };
  render() {
    console.log(this.props);
    const { formValues } = this.props;
    const { title, image, body } = formValues;
    return (
      <div className="container col-lg-10 ">
        <div className="card mb-3">
          <h4 className="card-header text-center p-4">Review Your Post</h4>
          <div className="row no-gutters m-3">
            {image && (
              <div className="col-md-4">
                <img src={image} className="card-img img-thumbnail" alt="..." />
              </div>
            )}

            <div className={`col-md-${image ? "8" : "12"}`}>
              <div className="card-body">
                <h5 className="card-title text-center">{title}</h5>
                <p className="card-text">{body}</p>
                <p className="card-text  text-right">
                  <span className="text-muted">
                    {" "}
                    - {this.props.current_user.bio.name}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="card-group">
            <button
              onClick={() => this.props.onCancel()}
              className="btn btn-primary btn-lg m-3"
            >
              Go Back
            </button>
            <button
              onClick={() => this.onSubmit(formValues)}
              type="submit"
              className="btn btn-success btn-lg m-3"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ form, auth }) => {
  // console.log(state.form.surveyForm.values)
  return {
    formValues: form.createPost.values,
    current_user: auth.current_user
  };
};

export default withRouter(
  connect(mapStateToProps, { submitNewPost })(PostCreateReview)
);
