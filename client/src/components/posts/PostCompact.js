import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCurrentUser } from "../../actions";

// TODO delete check if user exist because there will be no posts without user name
class PostCompact extends Component {
  render() {
    const {
      image,
      title,
      createdAt,
      user,
      body,
      _id,
      likes,
      published,
    } = this.props.post;
    // const postShowPath = this.props.current_user ? `/posts/show/${_id}` : "";
    // console.log(user.id === this.props.current_user._id)
    return (
      <div className="container col-lg-10 ">
        {this.props.post && (
          <div className="card mb-3">
            <div className="row no-gutters m-3 ">
              {image && (
                // vertical alignment in bootstrap - https://medium.com/wdstack/bootstrap-4-vertical-center-1211448a2eff
                <div className="col-md-4 my-auto">
                  <img
                    src={image}
                    className="card-img img-thumbnail"
                    alt="..."
                  />
                </div>
              )}

              <div className={`col-md-${image ? "8" : "12"}`}>
                <div className="card-body">
                  <h5 className="card-title text-center">{title}</h5>
                  <p className="card-text text-justify">
                    {body.length > 250
                      ? body.substring(0, 350) + "...  "
                      : body + "   "}

                    {this.props.current_user && (
                      <Link
                        to={`/posts/show/${_id}`}
                        className="font-weight-bolder"
                      >
                        see more
                      </Link>
                    )}
                  </p>
                  <div className="d-flex justify-content-between h-100">
                    <p className="card-text  text-left align-self-center text-muted d-inline mb-0">
                      {new Date(createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    {published && (
                      <p className="card-text align-self-center  text-center d-inline mb-0">
                        {likes}
                        <span className="likes d-inline">
                          <i className={`fa fa-heart `}></i>
                        </span>
                      </p>
                    )}
                    <p className="card-text  align-self-center text-right d-inline">
                      <Link
                        to={`/user-profile/${user._id}`}
                        className="text-muted"
                      >
                        {" "}
                        - {user.bio.name}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.current_user,
  };
};
export default connect(mapStateToProps, { fetchCurrentUser })(PostCompact);

/*


  <div className="card-group">
              <Link
                to={`/posts/show/${_id}`}
                type="submit"
                className="btn btn-success btn-lg m-3"
              >
                See more
              </Link>

            </div>





*/
