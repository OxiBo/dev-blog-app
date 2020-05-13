import React, { Component } from "react";

export default class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-8 homepage-content">
            <h1>Welcome!</h1>
            Sign up or sing in to read our blog posts
          </div>
          <div className="col-md-4 col-lg-4 signin-options">
            <div className="container card">
              <div className="card-body login-buttons">
                <a
                  className="btn btn-block btn-social btn-google p-2 m-0 rounded-0"
                  href="/auth/google"
                >
                  <i className="fa fa-google"> </i>
                  with Google
                </a>
                <a
                  className="btn btn-block btn-social btn-github p-2 m-0 rounded-0"
                  href="/auth/github"
                >
                  <i className="fa fa-github"> </i> with GitHub
                </a>
                <a
                  className="btn btn-block btn-social btn-twitter p-2 m-0 rounded-0"
                  href="/auth/twitter"
                >
                  <i className="fa fa-twitter"> </i> with Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
