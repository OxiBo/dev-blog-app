import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserCompact extends Component {
  render() {
    // console.log(this.props)
    const { avatar, name, occupation, _id, createdAt } = this.props.user;
    return (
      <div className="card mb-0">
        <div className="row m-4 no-gutters">
          <div className="col-md-4">
            <img src={avatar} className="img-fluid img-thumbnail" alt="..." />
          </div>
          <div className="col-md-8 user-compact-body">
            <div className="card-body">
              <h4 className="card-title">{name}</h4>
              <p className="card-text">{occupation === "Not specified" ? "" : occupation}</p>
              <p className="card-text">Since <span className="text-muted">{new Date(createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' } )}</span></p>
            </div>

            <div className="profile-btn text-center">
              <Link to={`/user-profile/${_id}`} className="btn my-main-btn btn-lg">
                See more
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
