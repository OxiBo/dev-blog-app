// TODO - make drop down for my posts, my drafts and new post

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
          href="/#" // https://stackoverflow.com/questions/52801051/react-site-warning-the-href-attribute-requires-a-valid-address-provide-a-valid
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Signin/up
        </a>
        <div
          className="dropdown-menu p-0 m-0 rounded-sm shadow-sm bg-white rounded"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <a
            className="dropdown-item btn btn-block btn-social btn-google p-2 m-0 rounded-0"
            href="/auth/google"
          >
            <i className="fa fa-google"> </i>
            with Google
          </a>
          <a
            className="dropdown-item btn btn-block btn-social btn-github p-2 m-0 rounded-0"
            href="/auth/github"
          >
            <i className="fa fa-github"> </i> with GitHub
          </a>
          <a
            className="dropdown-item btn btn-block btn-social btn-twitter p-2 m-0 rounded-0"
            href="/auth/twitter"
          >
            <i className="fa fa-twitter"> </i> with Twitter
          </a>
        </div>
      </li>
    );
  }

  render() {
    const { current_user } = this.props;

    return (
      <header>
        {/* navbar breakpoints - https://stackoverflow.com/questions/36405532/bootstrap-4-change-breakpoint-navbar 
        change to *navbar-expand-xsm for smaller screen ??? change to lg for production*/}
        <nav className="navbar navbar-expand-sm navbar-light fixed-top">
          <Link className="navbar-brand nav-item" to="/">
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
              <li className="nav-item active">
                <Link className="nav-link" to="/posts">
                  Blog Posts <span className="sr-only">(current)</span>
                </Link>{" "}
              </li>
              {current_user ? (
                <>
                  {/* <li className="nav-item active">
                    <Link className="nav-link" to="/posts">
                      Blog Posts <span className="sr-only">(current)</span>
                    </Link>{" "}
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">
                      Our bloggers
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      My posts
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link className="dropdown-item" to="/posts/new">
                        New Post
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={`/user/${current_user._id}/posts/drafts`}
                      >
                        My drafts
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={`/user/${current_user._id}/posts`}
                      >
                        My Posts <span className="sr-only">(current)</span>
                      </Link>
                    </div>
                  </li>

                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/posts/new">
                      New Post
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`/user/${current_user._id}/posts/drafts`}
                    >
                      My drafts
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link
                      className="nav-link"
                      to={`/user/${current_user._id}/posts`}
                    >
                      My Posts <span className="sr-only">(current)</span>
                    </Link>{" "}
                  </li> */}
                </>
              ) : (
                ""
              )}
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
                    <a className="nav-link disabled" href="/#">
                      Logged in as {current_user.bio.name}
                    </a>
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
    current_user: auth.current_user,
  };
};

export default connect(mapStateToProps, { fetchCurrentUser })(Header);
