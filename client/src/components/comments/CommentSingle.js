import React, { Component } from "react";
import { connect } from "react-redux";

class CommentSingle extends Component {
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
              { this.props.current_user._id === user.id ? (
<div className="card-group buttons m-0 p-0">
<button className="btn btn-sm btn-warning">
    Edit
</button>
<button className="btn btn-sm btn-danger">
    Delete
</button>
</div>
              ) : ""}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.current_user
  };
};

export default connect(mapStateToProps)(CommentSingle);
