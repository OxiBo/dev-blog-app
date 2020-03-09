import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "../actions";

class Header extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  renderAuthButtons() {
    return (
      <li className="nav-item nav-link dropdown mr-auto">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Signin/up
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link
            className="dropdown-item btn btn-block btn-social btn-google"
            to="/auth/google"
          >
            <i className="fa fa-google"> </i>
            with Google
          </Link>
          <Link
            className="dropdown-item btn btn-block btn-social btn-github"
            to="/auth/github"
          >
            <i className="fa fa-github"> </i> with GitHub
          </Link>
          <a className="dropdown-item" href="#">
            with Twitter
          </a>
        </div>
      </li>
    );
  }

  render() {
    const { current_user } = this.props;
    // console.log(this.props)
    // console.log( current_user)
    // const { google, github } = current_user || {};
    // console.log(google)
    // console.log(github)
    return (
      <header>
        {/* navbar breakpoints - https://stackoverflow.com/questions/36405532/bootstrap-4-change-breakpoint-navbar */}
        <nav className="navbar navbar-expand-sm navbar-light fixed-top">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {current_user ? (
                <>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/posts">
                      Blog Posts <span className="sr-only">(current)</span>
                    </Link>{" "}
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to={`/user/${current_user._id}/posts`}>
                      My Posts <span className="sr-only">(current)</span>
                    </Link>{" "}
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/posts/new">
                      New Post
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">
                      Our bloggers
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}

              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {!current_user ? (
                this.renderAuthButtons()
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      href={`/user-profile/${current_user._id}`}
                      className="nav-link"
                    >
                      My Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link disabled">
                      Logged in as {current_user.bio.name}
                    </p>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/api/logout">
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.current_user
  };
};

export default connect(mapStateToProps, { fetchCurrentUser })(Header);