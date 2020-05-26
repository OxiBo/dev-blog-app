import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchComments, setSpinner } from "../../actions";
import Spinner from "../Spinner";
import CommentSingle from "./CommentSingle";

class CommentsList extends Component {
  async componentDidMount() {
    await this.props.setSpinner();
    await this.props.fetchComments(this.props.postId);
    await this.props.setSpinner(false);
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     if (this.props.comments.length > nextProps.comments.length) {
  //       this.props.fetchComments(this.props.postId);
  //     }
  //   }
  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Spinner />
        ) : this.props.comments.length > 0 ? (
          <ul className="list-group mt-4 comments">
            {this.props.comments.map((comment) => (
              <CommentSingle key={comment._id} comment={comment} />
            ))}
          </ul>
        ) : (
          <div className="list-group m-2 p-2 text-center">
            Nobody left a comment yet...
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ posts, comments, spinner }) => {
  return {
    postId: posts.post._id,
    isLoading: spinner.isLoading,
    comments: comments.comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
  };
};

export default connect(mapStateToProps, { fetchComments, setSpinner })(
  CommentsList
);
