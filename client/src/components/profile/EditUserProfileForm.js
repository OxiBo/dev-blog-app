import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { fetchCurrentUser, editProfile } from "../../actions";
import renderRadioInput from "../../utils/renderRadioInputRedux";
import { errorTostStyle } from "../../styles/toastifyStyles";
import validateEmail from "../../utils/validateEmail";
import validateURL from "../../utils/validateURL";
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

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="col-sm-8 invalid-feedback">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, meta, label, placeholder, type, id }) => {
    // console.log(input.name);
    const className = `list-group-item ${
      meta.error && meta.touched ? "invalid-feedback" : ""
    }`;
    const errorStyle = meta.error && meta.touched ? "is-invalid " : "";
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
              className={`form-control ${errorStyle}`}
            />
          </div>

          {this.renderError(meta)}
        </li>
      );
    }
    return "";
  };

  onSubmit = formValues => {
    const { userId } = this.props.match.params;
    // if user submitted empty string, change in to 'not specified
    Object.entries(formValues).forEach(item => {
      if (item[1] === "") {
        formValues[item[0]] = "Not specified";
      }
    });
    this.props.editProfile(userId, formValues);
    this.props.history.push(`/user-profile/${userId}`);
  };

  renderContent() {
    const userDetails = [
      "name",
      "email",
      "occupation",
      "age",
      "avatar",
      "gender"
    ];
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
            className="needs-validation"
            noValidate
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
                  {/* was class card */}
                  <div className="">
                    <ul className="list-group list-group-flush form-group row ">
                      {userDetails.map((item, index) => {
                        return (
                          <Field
                            key={this.props.initialValues[item] + index}
                            label={item}
                            name={item}
                            component={this.renderInput}
                            type="text"
                          />
                        );
                      })}

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
const validate = formValues => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "You must enter your name";
  }
  if (
    formValues.name &&
    (formValues.name.trim().length > 40 || formValues.name.trim().length < 1)
  ) {
    errors.name = "Your name is either too long or too short";
  }

  if (!validateEmail(formValues.email)) {
    errors.email = "You must enter valid email";
  }

  if (formValues.avatar && !validateURL(formValues.avatar)) {
    errors.avatar = "You must enter valid url";
  }

  if (
    formValues.occupation &&
    (formValues.occupation.trim().length > 40 ||
      formValues.occupation.trim().length < 3)
  ) {
    errors.occupation = "You must enter valid occupation title";
  }

  if (formValues.age && (formValues.age > 110 || formValues.age < 14)) {
    errors.age =
      "You have to be older then 14 years old and younger then 110 years old";
  }

  // check if user filled in age field with a number
  if (isNaN(formValues.age)) {
    errors.age = "Your age have to be a number";
  }

  return errors;
};

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.current_user,
    initialValues: auth.current_user && auth.current_user.bio
  };
};

export default connect(mapStateToProps, { fetchCurrentUser, editProfile })(
  reduxForm({ form: "editUserProfile", enableReinitialize: true, validate })(
    EditUserProfile
  )
); // https://medium.com/@1sherlynn/react-redux-form-two-ways-to-add-initial-values-ab48daa0a32e
