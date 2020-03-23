import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../actions";

class CommentSingle extends Component {
  renderButtons() {
    const { _id, user } = this.props.comment;
    return this.props.current_user._id === user.id ? (
      <>
        <button className="btn btn-sm btn-outline-warning">Edit</button>
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
    const { _id, text, user, createdAt } = this.props.comment;
    return (
      <li className="list-group-item">
        <div className="row no-gutters col-md-12">
          <div className="col-md-2 text-center user-tiny">
            <p className="text-center p-1 m-1">
              <Link to={`/user-profile/${user.id}`}>{user.name}</Link>
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
    );
  }
}

const mapStateToProps = ({ auth, posts }) => {
  return {
    current_user: auth.current_user,
    post: posts.post
  };
};

export default connect(mapStateToProps, { deleteComment })(CommentSingle);

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
