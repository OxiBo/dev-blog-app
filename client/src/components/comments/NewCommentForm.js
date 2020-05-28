import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

class NewCommentForm extends Component {
  // onSubmit = values => {
  //   this.props.onSubmit(values);
  //   // console.log(values);
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
    // console.log(this.props);
    const {
      bio: { avatar, name }
    } = this.props.current_user;
    return (
      <div className="row no-gutters col-md-12 shadow-sm p-3 mb-5 bg-white rounded">
        <div className="col-md-2 text-center  user-tiny">
          <div className="user-icon-container ">
            <img src={avatar} className="card-img user-icon" alt="..." />
          </div>

          <p className="text-center">{name}</p>
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title text-center">
              {this.props.form === "editCommentForm"
                ? "Edit comment"
                : "Add comment"}
            </h5>
            <form
              className=""
              onSubmit={this.props.handleSubmit(values =>
                this.props.onSubmit(values)
              )}
            >
              <Field
                type="textarea"
                name="text"
                component={this.renderTextarea}
                placeholder="Enter text"
                rows="4"
              />
              <div className="buttons">
                {this.props.form === "editCommentForm" && (
                  <button type="button" // https://github.com/redux-form/redux-form/issues/2679
                    className="btn btn-md  my-main-btn ml-auto m-2"
                    onClick={this.props.onCancel}
                  >
                    Cancel
                  </button>
                )}
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

  if (!formValues.text) {
    errors.text = "You must enter your comment";
  }
  if (
    formValues.text &&
    (formValues.text.trim().length > 500 || formValues.text.trim().length < 2)
  ) {
    errors.text = "Your text is either too long or too short";
  }

  return errors;
};

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.current_user
  };
};

export default connect(mapStateToProps)(
  reduxForm({ validate, destroyOnUnmount: false, enableReinitialize: true })(NewCommentForm)
);
