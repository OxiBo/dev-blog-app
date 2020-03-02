import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { fetchCurrentUser } from "../../actions";

const parseUserDetails = current_user => {
  if (current_user) {
    const { age, avatar, occupation, gender } = current_user.bio;
    const userDetails = current_user.google
      ? { userName: current_user.google.name, email: current_user.google.email }
      : current_user.github
      ? { userName: current_user.github.name, email: current_user.github.email }
      : {
          userName: current_user.twitter.name,
          email: current_user.twitter.email
        };

    return { ...userDetails, age, avatar, occupation, gender };
  }
  return {};
};

class EditUserProfile extends Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.fetchCurrentUser();
  }

  renderInput = ({ input, meta, label, placeholder, type, id }) => {
    // console.log(input.name);
    const className = `list-group-item ${
      meta.error && meta.touched ? "error" : ""
    }`;
    return (
      <li className={className}>
        <label className="col-sm-4 col-form-label" htmlFor="">
          {label}
        </label>
        <div class="col-sm-8">
          <input
            {...input}
            placeholder={placeholder}
            type={type}
            id={id}
            autoComplete="off"
            className="form-control"
          />
        </div>

        {/* {this.renderError(meta)} */}
      </li>
    );
  };

  renderContent() {
    return (
      <div className="container">
        <div className="card bg-light mb-4">
          <h2 className="card-header text-center text-uppercase">
            Edit profile
          </h2>
          <div className="row no-gutters">
            <div className="col-md-6">
              <img
                className="card-img img-thumbnail"
                src={this.props.initialValues.avatar}
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="card-body py-1">
                <div className="card">
                  <form
                    onSubmit={this.props.handleSubmit(values =>
                      this.props.onFormSubmit(values)
                    )}
                    action=""
                    className=""
                  >
                    <ul className="list-group list-group-flush form-group row ">
                      {Object.entries(this.props.initialValues).map(
                        (item, index) => {
                          return (
                            <Field
                              key={item[1] + index}
                              label={item[0].toUpperCase()}
                              name={item[0]}
                              component={this.renderInput}
                              type="text"
                              placeholder={item[1]}
                            />
                          );
                        }
                      )}
                    </ul>
                    <div className="card-group">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => this.props.history.goBack()}
                      >
                        GO BACK
                      </button>
                      <button type="submit" className="btn btn-success btn-lg">
                        SUBMIT
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.current_user) {
      return <div>{this.renderContent()}</div>;
    }

    return <div>Loading...</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.user,
    initialValues: parseUserDetails(auth.user)
  };
};

export default connect(mapStateToProps, { fetchCurrentUser })(reduxForm({ form: "editUserProfile", enableReinitialize: true })(
  EditUserProfile)
); // https://medium.com/@1sherlynn/react-redux-form-two-ways-to-add-initial-values-ab48daa0a32e
