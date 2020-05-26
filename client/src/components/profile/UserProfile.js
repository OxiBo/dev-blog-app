import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { fetchCurrentUser, fetchUser, setSpinner } from "../../actions";
// import parseUserDetails from "../../utils/parseUserDetails";

class UserProfile extends Component {
  async componentDidMount() {
    await this.props.fetchCurrentUser();
    await this.props.setSpinner();
    // console.log(this.props.match.params.userId)
    await this.props.fetchUser(this.props.match.params.userId);
    this.props.setSpinner(false);
    // console.log(this.props);
    // console.log(this.props.match.params.userId)
  }

  renderContent() {
    const { bio } = this.props.user;
    const { avatar } = bio;
    const userDetails = ["name", "email", "occupation", "age", "gender"];
    return (
      <div className="container">
        <div className="card bg-light mb-4">
          <h2 className="card-header text-center text-uppercase">
            User profile
          </h2>
          <div className="row no-gutters">
            <div className="col-md-6">
              <img className="card-img img-thumbnail" src={avatar} alt="" />
            </div>
            <div className="col-md-6">
              <div className="card-body py-1">
                <div className="card">
                  <ul className="list-group list-group-flush">
                    {userDetails.map((item, index) => {
                      return (
                        <li
                          className="list-group-item row"
                          key={bio[item] + index}
                        >
                          <dt className="col-sm-5 text-uppercase">{item}</dt>
                          <dd className="col-sm-7">{bio[item]}</dd>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card-group buttons">
            <button
              type="button"
              className="btn btn-info my-main-btn btn-lg"
              onClick={() => this.props.history.goBack()}
            >
              GO BACK
            </button>

            {this.props.current_user &&
              this.props.current_user._id ===
                this.props.match.params.userId && (
                <Link
                  to={`/user-profile/${this.props.match.params.userId}/edit`}
                  type="button"
                  className="btn btn-edit btn-lg"
                >
                  EDIT
                </Link>
              )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    // console.log(this.props);

    return (
      <>
        {this.props.isLoading ? (
          <Spinner />
        ) : this.props.user &&
          Object.entries(this.props.user).length > 0 &&
          this.props.user.constructor === Object ? (
          <div>{this.renderContent()}</div>
        ) : (
          ""
        )}
      </>
    );
    // TODO - need to display error message in case of receiving an error from server or redirect
  }
}

const mapStateToProps = ({ auth, spinner }) => {
  //   console.log(auth.user);
  return {
    isLoading: spinner.isLoading,
    current_user: auth.current_user,
    user: auth.user,
    // user: parseUserDetails(auth.user)
  };
};

export default connect(mapStateToProps, {
  fetchCurrentUser,
  fetchUser,
  setSpinner,
})(UserProfile);

/*

    {Object.entries(bio).map((item, index) => {
                      return (
                        <li
                          className="list-group-item row"
                          key={item[1] + index}
                        >
                          <dt className="col-sm-5 text-uppercase">{item[0]}</dt>
                          <dd className="col-sm-7">{item[1]}</dd>
                        </li>
                      );
                    })}


*/
