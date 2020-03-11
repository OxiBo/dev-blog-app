import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, fetchCurrentUser, deletePost } from "../../actions";

class PostShow extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
    this.props.fetchPost(this.props.match.params.postId);
  }
  render() {
    if (this.props.post) {
      const { title, image, body, user, _id } = this.props.post;

      return (
        <div className="container col-lg-10 ">
          <div className="card mb-3">
            <h4 className="card-header text-center p-4">{title}</h4>
            <div className="row no-gutters m-3">
              {image && (
                <div className="col-md-4">
                  <img
                    src={image}
                    className="card-img img-thumbnail"
                    alt="..."
                  />
                </div>
              )}

              <div className={`col-md-${image ? "8" : "12"}`}>
                <div className="card-body">
                  {/* <h5 className="card-title text-center">{title}</h5> */}
                  <p className="card-text">{body}</p>
                  <p className="card-text  text-right">
                    <Link
                      to={`/user-profile/${user.id}`}
                      className="text-muted"
                    >
                      {" "}
                      - {user.name}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="card-group">
              <button
                onClick={() => this.props.history.goBack()}
                className="btn btn-primary btn-lg m-3"
              >
                Go Back
              </button>
              {this.props.current_user &&
                this.props.current_user._id === user.id && (
                  <>
                    <button
                      onClick={() => console.log("edit button clicked")}
                      className="btn btn-warning btn-lg m-3"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        this.props.deletePost(_id);
                      }}
                      className="btn btn-danger btn-lg m-3"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading....</div>;
    }
  }
}

const mapStateToProps = ({ auth, posts }) => {
  return {
    current_user: auth.current_user,
    post: posts.post
  };
};
export default connect(mapStateToProps, {
  fetchPost,
  fetchCurrentUser,
  deletePost
})(PostShow);
