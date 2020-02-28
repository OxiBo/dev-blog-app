import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrentUser } from "../actions";

class Header extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  renderAuthButtons() {
    return (
      <li className="nav-item dropdown mr-auto">
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
          <a
            className="dropdown-item btn btn-block btn-social btn-google"
            href="/auth/google"
          >
            <i className="fa fa-google"> </i>
            with Google
          </a>
          <a
            className="dropdown-item btn btn-block btn-social btn-github"
            href="/auth/github"
          >
            <i className="fa fa-github"> </i> with GitHub
          </a>
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
    const { google, github } = current_user || {} ;
    // console.log(google)
    // console.log(github)
    return (
      <header>
        {/* navbar breakpoints - https://stackoverflow.com/questions/36405532/bootstrap-4-change-breakpoint-navbar */}
        <nav className="navbar navbar-expand-sm navbar-light fixed-top">
          <a className="navbar-brand" href="/">
            Home
          </a>
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
                <a className="nav-link" href="/posts">
                  Blog Posts <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
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
                <li className='nav-item nav-link'>
                 Logged in as { (google && google.name) || (github && github.name)} 
              
                </li>
                <li className='nav-item'>
                  <a className="nav-link" href="/api/logout">
                    <i className="fa fa-sign-out" aria-hidden="true"></i>Logout
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
    current_user: auth.user
  };
};

export default connect(mapStateToProps, { fetchCurrentUser })(Header);
