import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
// import { connect } from 'react-redux'

class NewCommentForm extends Component {
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
        {/* {this.renderError(meta)} */}
      </>
    );
  };

  render() {
    return (
      <div className="row no-gutters col-md-12">
        <div className="col-md-2">
          <img src="..." className="card-img" alt="..." />
          <p>nameå\</p>
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

export default reduxForm({ form: "newComment" })(NewCommentForm);
