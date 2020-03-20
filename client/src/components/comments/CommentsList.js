import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchComments } from "../../actions";
import CommentSingle from "./CommentSingle";

class CommentsList extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.postId);
  }
  render() {
    return (
      <>
        {this.props.comments.length === 0 ? (
          <div className="list-group m-2 p-2 text-center">
            Nobody left a comment yet...
          </div>
        ) : (
          <ul className="list-group mt-4">
            {this.props.comments.map(comment => (
              <CommentSingle key={comment._id} comment={comment} />
            ))}
          </ul>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ posts, comments }) => {
  return {
    postId: posts.post._id,
    comments: comments.comments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
  };
};

export default connect(mapStateToProps, { fetchComments })(CommentsList);
