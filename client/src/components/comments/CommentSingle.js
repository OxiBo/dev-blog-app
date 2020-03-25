import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment, renderEditComment } from "../../actions";
import EditComment from "./EditComment";

class CommentSingle extends Component {
  //   state = {
  //     showEditCommentForm: false
  //   };

  onCancel = () => {
    this.props.renderEditComment();
  };

  renderButtons() {
    const { _id, user } = this.props.comment;
    return this.props.current_user._id === user.id ? (
      <>
        <button
          className="btn btn-sm btn-outline-warning"
          onClick={() => this.props.renderEditComment(_id)}
        >
          Edit
        </button>
        <button
          onClick={() => {
            this.props.deleteComment(_id, this.props.post._id);
          }}
          className="btn btn-sm btn-outline-danger"
        >
          Delete
        </button>
      </>
    ) : this.props.current_user._id === this.props.post.user.id ? (
      <button
        onClick={() => {
          this.props.deleteComment(_id, this.props.post._id);
        }}
        className="btn btn-sm btn-outline-danger"
      >
        Delete
      </button>
    ) : (
      ""
    );
  }
  render() {
    const { text, user, createdAt, _id } = this.props.comment;
    // console.log(this.state)
    const { id, avatar, name } = user;
    return (
      <>
        {this.props.renderEditForm === _id ? (
          <EditComment comment={this.props.comment} onCancel={this.onCancel} />
        ) : (
          <li className="list-group-item">
            <div className="row no-gutters col-md-12">
              <div className="col-md-2 text-center user-tiny">
                <div className="user-icon-container m-2">
                  {avatar && ( // change this before deployment
                    <img
                      src={avatar}
                      className="card-img user-icon"
                      alt="..."
                    />
                  )}
                </div>
                <p className="text-center p-0 m-0 mb-2">
                  <Link to={`/user-profile/${id}`}>{name}</Link>
                </p>
              </div>
              <div className="col-md-10">
                <div className="card-body p-1 m-1">
                  <p className="card-text m-1">{text}</p>
                  <p className="text-muted m-0 text-right font-italic">
                    {new Date(createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour24: true
                    })}
                  </p>
                  <div className="card-group buttons-small m-0 p-0">
                    {this.renderButtons()}
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ auth, posts, comments }) => {
  return {
    current_user: auth.current_user,
    post: posts.post,
    renderEditForm: comments.renderEditForm
  };
};

export default connect(mapStateToProps, { deleteComment, renderEditComment })(
  CommentSingle
);

/*


  {this.props.current_user._id === user.id ? (
                <div className="card-group buttons-small m-0 p-0">
                  <button className="btn btn-sm btn-outline-warning">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      this.props.deleteComment(_id, this.props.post._id);
                    }}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                ""
              )}
------------------

this.props.current_user._id === user.id ? (
                  <>
                    <button className="btn btn-sm btn-outline-warning">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        this.props.deleteComment(_id, this.props.post._id);
                      }}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </>
                ) : this.props.current_user._id === this.props.post.user.id ? (
                  <button
                    onClick={() => {
                      this.props.deleteComment(_id, this.props.post._id);
                    }}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )
*/
