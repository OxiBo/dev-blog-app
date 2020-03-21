import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

class NewCommentForm extends Component {
  // onSubmit = values => {
  //   this.props.onSubmit(values);
  //   console.log(values);
  // };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="col-sm-8 invalid-feedback">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderTextarea = ({ input, meta, name, label, type, placeholder, rows }) => {
    const errorStyle = meta.error && meta.touched ? "is-invalid " : "";
    return (
      <>
        <textarea
          {...input}
          name={name}
          type={type}
          autoComplete="off"
          className={`form-control ${errorStyle}`}
          placeholder={placeholder}
          rows={rows}
        />
        {/* {console.log(this)} */}
        {this.renderError(meta)}
      </>
    );
  };

  render() {
    const {
      bio: { avatar, name }
    } = this.props.current_user;
    return (
      <div className="row no-gutters col-md-12">
        <div className="col-md-2 text-center  user-tiny">
          <div className="user-icon-container ">
            <img src={avatar} className="card-img user-icon" alt="..." />
          </div>

          <p className="text-center">{name}</p>
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title text-center">Add comment</h5>
            <form
              className=""
              onSubmit={this.props.handleSubmit(values =>
                this.props.onSubmit(values)
              )}
            >
              <Field
                type="textarea"
                name="commentBody"
                component={this.renderTextarea}
                placeholder="Enter text"
                rows="4"
              />
              <div className="buttons">
                <button className="btn btn-md btn-success ml-auto m-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  // TODO: correct the maximum length before deployment

  if (!formValues.commentBody) {
    errors.commentBody = "You must enter your comment";
  }
  if (
    formValues.commentBody &&
    (formValues.commentBody.trim().length > 500 ||
      formValues.commentBody.trim().length < 2)
  ) {
    errors.commentBody = "Your text is either too long or too short";
  }

  return errors;
};

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.current_user
  };
};

export default connect(mapStateToProps)(
  reduxForm({ form: "newComment", validate })(NewCommentForm)
);
