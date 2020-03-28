import React, { Component } from "react";
import { withRouter } from "react-router";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import validateURL from "../../utils/validateURL";

const formFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter title"
  },
  {
    name: "image",
    label: "Image",
    type: "text",
    placeholder: "Enter image url"
  }
];

class PostCreateForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="col-sm-8 invalid-feedback">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, meta, name, label, type, placeholder }) => {
    const className = `col-sm-4 col-form-label text-uppercase font-weight-bold text-right ${
      meta.error && meta.touched ? "invalid-feedback" : ""
    }`;
    const errorStyle = meta.error && meta.touched ? "is-invalid " : "";
    return (
      <div className="form-inline m-3">
        <label className={className} htmlFor={name}>
          {label}
        </label>
        <div className="col-sm-8">
          <input
            {...input}
            type={type}
            autoComplete="off"
            className={`form-control ${errorStyle}`}
            placeholder={placeholder}
          />
        </div>

        {/* {console.log(this)} */}
        {this.renderError(meta)}
      </div>
    );
  };

  // onSubmit = values => {
  //   console.log(values);
  // };

  renderTextarea = ({ input, meta, name, label, type, placeholder, rows }) => {
    const className = `col-sm-4 col-form-label text-uppercase font-weight-bold text-right ${
      meta.error && meta.touched ? "invalid-feedback" : ""
    }`;
    const errorStyle = meta.error && meta.touched ? "is-invalid " : "";
    return (
      <div className="form-inline m-3">
        <label className={className} htmlFor="">
          {label}
        </label>

        <div className="col-sm-8">
          <textarea
            {...input}
            name={name}
            type={type}
            autoComplete="off"
            className={`form-control ${errorStyle}`}
            placeholder={placeholder}
            rows={rows}
          />
        </div>

        {/* {console.log(this)} */}
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    // console.log(this.props);
    return (
      <div className="container">
        <div className="card">
          <h3 className="card-header text-center p-4">
            {this.props.formTitle ? "Edit Post" : "New Post"}
          </h3>
          <form
            action=""
            onSubmit={this.props.handleSubmit(values =>
              this.props.onSubmit(values)
            )}
            className="needs-validation m-4"
            noValidate
          >
            {formFields.map(({ name, label, type, placeholder }, index) => {
              return (
                <Field
                  key={name + index}
                  label={label}
                  name={name}
                  component={this.renderInput}
                  type={type}
                  className="form-control"
                  placeholder={placeholder}
                />
              );
            })}

            <Field
              label="Your Post"
              type="textarea"
              name="body"
              component={this.renderTextarea}
              className="form-control w-100"
              placeholder="Enter text"
              rows="6"
            />

            <div className="card-group buttons">
              <button
                onClick={() => this.props.history.push("/posts")}
                className="btn btn-primary btn-lg m-3"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success btn-lg m-3">
                {this.props.formTitle ? "Submit" : "View draft"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter title";
  }

  if (
    formValues.title &&
    (formValues.title.trim().length > 60 || formValues.title.trim().length < 3)
  ) {
    errors.title = "Title is either too long or too short";
  }

  if (formValues.image && !validateURL(formValues.image)) {
    errors.image = "You must enter valid url";
  }
  if (!formValues.body) {
    errors.body = "You must enter text";
  }

  // correct the maximum length before deployment
  if (
    formValues.body &&
    (formValues.body.trim().length > 3000 || formValues.body.trim().length < 3)
  ) {
    errors.body = "Your text is either too long or too short";
  }

  return errors;
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  };
};

export default withRouter(
  connect(mapStateToProps)(
    reduxForm({ form: "createPost", destroyOnUnmount: false, validate })(
      PostCreateForm
    )
  )
);
