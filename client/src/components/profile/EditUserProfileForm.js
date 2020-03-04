import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { fetchCurrentUser, editProfile } from "../../actions";
import renderRadioInput from "../../utils/renderRadioInputRedux";
// import parseUserDetails from "../../utils/parseUserDetails";
// import axios from "axios";

class EditUserProfile extends Component {
  async componentDidMount() {
    // console.log(this.props);
    await this.props.fetchCurrentUser();
    // const user = await axios.get(
    //   "/api/user-profile/" + this.props.match.params.userId
    // );
    // console.log(user);
  }

  renderInput = ({ input, meta, label, placeholder, type, id }) => {
    // console.log(input.name);
    const className = `list-group-item ${
      meta.error && meta.touched ? "error" : ""
    }`;
    if (label !== "gender") {
      return (
        <li className={className} key={label + placeholder}>
          <label
            className="col-sm-4 col-form-label text-uppercase font-weight-bold"
            htmlFor=""
          >
            {label}
          </label>
          <div className="col-sm-8">
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
    }
    return "";
  };

  onSubmit = values => {
    const { userId } = this.props.match.params;
    // console.log(values);
    this.props.editProfile(userId, values);
    this.props.history.push(`/user-profile/${userId}`);
  };

  renderContent() {
    return (
      <div className="container">
        <div className="card bg-light mb-4">
          <h2 className="card-header text-center text-uppercase">
            Edit profile
          </h2>
          {/* <div className="row no-gutters"> */}
          <form
            onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
            action=""
            className=""
          >
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
                    <ul className="list-group list-group-flush form-group row ">
                      {Object.entries(this.props.initialValues).map(
                        (item, index) => {
                          return (
                            <Field
                              key={item[1] + index}
                              label={item[0]}
                              name={item[0]}
                              component={this.renderInput}
                              type="text"
                              placeholder={item[1]}
                            />
                          );
                        }
                      )}

                      <li className="list-group-item">
                        <Field
                          name="gender"
                          label="CHOOSE YOUR GENDER"
                          component={renderRadioInput}
                          options={{
                            male: "Male",
                            female: "Female",
                            notDefined: "Prefer not to say"
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
    current_user: auth.current_user,
    initialValues: auth.current_user && auth.current_user.bio
  };
};

export default connect(mapStateToProps, { fetchCurrentUser, editProfile })(
  reduxForm({ form: "editUserProfile", enableReinitialize: true })(
    EditUserProfile
  )
); // https://medium.com/@1sherlynn/react-redux-form-two-ways-to-add-initial-values-ab48daa0a32e
