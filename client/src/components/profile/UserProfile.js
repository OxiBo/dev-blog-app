import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCurrentUser } from "../../actions";

class UserProfile extends Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.fetchCurrentUser();
  }

  renderContent() {
    const { current_user } = this.props;
    const { age, avatar, occupation, gender } = current_user.bio;
    const userDetails = current_user.google
      ? { userName: current_user.google.name, email: current_user.google.email }
      : current_user.github
      ? { userName: current_user.github.name, email: current_user.github.email }
      : {
          userName: current_user.twitter.name,
          email: current_user.twitter.email
        };

    // const user = Object.assign(userDetails, {
    //   age,
    //   avatar,
    //   occupation,
    //   gender
    // });

    // console.log(
    //   Object.entries({ ...userDetails, age, avatar, occupation, gender })
    // );
    // console.log(this.props.current_user);
    // console.log(user);

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
                    {Object.entries({
                      ...userDetails,
                      age,
                      occupation,
                      gender
                    }).map((item, index) => {
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
            <Link
              to={`/user-profile/${current_user._id}/edit`}
              type="button"
              className="btn btn-warning btn-lg"
            >
              EDIT
            </Link>
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
    console.log(auth.user)
  return {
    current_user: auth.user
  };
};

export default connect(mapStateToProps, { fetchCurrentUser })(UserProfile);

/*

 <div className="container">
      <h2 className="card-header">User profile</h2>
        <div class="card-body row container-fluid">
          <div class="col-12 col-md-6"><img className='img-thumbnail img-fluid' src={user.avatar} alt=""/></div>
          <div class="col-12 col-md-6">.col-6 .col-md-4</div>
        </div>
      </div>


*/
