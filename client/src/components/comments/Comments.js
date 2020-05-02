import React, { Component } from "react";
import NewComment from "./NewComment";
import CommentsList from "./CommentsList";

export default class Comments extends Component {
  state = {
    showComments: false
  };

  render() {
    return (
      <div className="card m-3 border-0">
        <NewComment />
        <button
          onClick={() =>
            this.setState(prevState => ({
              showComments: !prevState.showComments
            }))
          }
          className="btn my-outline-info-btn btn-lg btn-block"
        >
          {this.state.showComments ? "Hide Comments" : "Show Comments"}
        </button>
        {this.state.showComments ? <CommentsList /> : ""}
      </div>
    );
  }
}
