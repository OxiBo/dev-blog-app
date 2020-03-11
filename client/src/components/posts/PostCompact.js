import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCurrentUser } from "../../actions";

// TODO delete check if user exist because there will be no posts without user name
class PostCompact extends Component {
  render() {
    const { image, title, createdAt, user, body, _id } = this.props.post;
    // console.log(user.id === this.props.current_user._id)
    return (
      <div className="container col-lg-10 ">
        <div className="card mb-3">
          <div className="row no-gutters m-3">
            {image && (
              <div className="col-md-4">
                <img src={image} className="card-img img-thumbnail" alt="..." />
              </div>
            )}

            <div className={`col-md-${image ? "8" : "12"}`}>
              <div className="card-body">
                <h5 className="card-title text-center">{title}</h5>
                <p className="card-text">
                  {body.length > 350 ? body.substring(0, 350) + "..." : body}
                </p>
                <div className="d-flex justify-content-between">
                  <p className="card-text  text-left d-inline">
                    <span className="text-muted">
                      {" "}
                      {new Date(createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </span>
                  </p>
                  <p className="card-text  text-right d-inline">
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
          </div>
          <div className="card-group">
            <Link
              to={`/posts/show/${_id}`}
              type="submit"
              className="btn btn-success btn-lg m-3"
            >
              See more
            </Link>

            {/* {user.id === this.props.current_user._id && (
              <Link
                to={`/posts/${_id}/edit`}
                type="submit"
                className="btn btn-warning btn-lg m-3"
              >
                Edit
              </Link>
            )} */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.current_user
  };
};
export default connect(mapStateToProps, { fetchCurrentUser })(PostCompact);
