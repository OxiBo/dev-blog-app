import React, { Component } from "react";

import NewComment from "./NewComment";
import CommentsList from "./CommentsList";
import axios from 'axios'

export default class Comments extends Component {
  state = {
    showComments: false
  };

//   async componentDidMount(){
//       console.log(this.props)
// // const comments = await axios.get(`/api/posts/show/${this.props.postId}/comments`)
// // console.log(comments)
//   }
  render() {
    return (
      <div className="card m-3">
        <NewComment />
        <button
          onClick={() =>
            this.setState(prevState => ({
              showComments: !prevState.showComments
            }))
          }
          className="btn btn-outline-info btn-lg btn-block"
        >
          {this.state.showComments ? "Hide Comments" : "Show Comments"}
        </button>
        {this.state.showComments ? <CommentsList /> : ""}
      </div>
    );
  }
}


