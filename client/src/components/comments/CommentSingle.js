import React, { Component } from "react";

export default class CommentSingle extends Component {
  render() {
    const { text, user, createdAt } = this.props.comment;
    return (
      <li className="list-group-item">
        <div className="row no-gutters col-md-12">
          <div className="col-md-2 text-center user-tiny">
            <p className="text-center p-1 m-1">{user.name}</p>
          </div>
          <div className="col-md-10">
            <div className="card-body p-1 m-1">
              <p className="card-text m-1">{text}</p>
              <p className="text-muted m-0 text-right">
                {new Date(createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour24: true
                })}
              </p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
