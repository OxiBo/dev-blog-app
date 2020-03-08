import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class PostCreateReview extends Component {
    onSubmit = (values) => {
        console.log(values)
    }
  render() {
      const { formValues } = this.props;
      const { title, image, body } = formValues;
    return (
      <div className="container col-lg-10 ">
        <div className="card mb-3">
          <h4 className="card-header text-center p-4">Review Your Post</h4>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={image} className="card-img thumbnail" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                 {body}
                </p>
                <p className="card-text  text-right">
                  <span className="text-muted"> -Last updated 3 mins ago</span>
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
            <button onClick={() => this.onSubmit(formValues)}
            type="submit" className="btn btn-success btn-lg m-3">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ form }) => {
  // console.log(state.form.surveyForm.values)
  return {
    formValues: form.createPost.values
  };
};

export default withRouter(connect(mapStateToProps)(PostCreateReview));
