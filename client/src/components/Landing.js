import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrentUser } from "../actions";

class Landing extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  render() {
      const styles = this.props.current_user ? '12' : '8' 
    return (
      <div className="container">
        <div className="row">
          <div className={`col-md-${styles} col-lg-${styles} homepage-content`}>
            <h1>Welcome!</h1>
            Sign up or sing in to read our blog posts
          </div>

          {this.props.current_user ? (
            ""
          ) : (
            <div className="col-md-4 col-lg-4 signin-options">
              <div className="container card">
                <h3 className="text-center card-header mt-4">Sign up/in </h3>
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
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.current_user,
  };
};

export default connect(mapStateToProps, { fetchCurrentUser })(Landing);
