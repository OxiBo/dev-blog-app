import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Comments from '../comments/Comments';
import { fetchPost, deletePost } from "../../actions";

class PostShow extends Component {
  componentDidMount() {
    // this.props.fetchCurrentUser();
    this.props.fetchPost(this.props.match.params.postId);
  }
  render() {
    if (this.props.post) {
      const { title, image, body, user, _id } = this.props.post;

      return (
        <div className="container col-lg-10 ">
          <div className="card mb-3">
            <h4 className="card-header text-center p-4">{title}</h4>
            <div className="row no-gutters mb-1">
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
                <div className="card-body p-1 ">
                  {/* <h5 className="card-title text-center">{title}</h5> */}
                  <p className="card-text mr-3 ml-3 mb-0 text-justify post-body">{body}</p>
                  <p className="card-text  text-right p-1 pr-3">
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
            <div className="card-group buttons m-0 p-0">
              <button
                onClick={() => this.props.history.goBack()}
                className="btn btn-primary btn-lg m-0 p-2"
              >
                Go Back
              </button>
              {this.props.current_user &&
                this.props.current_user._id === user.id && (
                  <>
                    <Link
                      to={`/posts/edit/${_id}`}
                      className="btn btn-warning btn-lg m-0 p-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => {
                        this.props.deletePost(_id);
                        this.props.history.goBack();
                      }}
                      className="btn btn-danger btn-lg m-0 p-2"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          <Comments />
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

  deletePost
})(PostShow);

/*

<div class="container">
    <article class="row single-post mt-5 no-gutters">
        <div class="col-md-6">
            <div class="image-wrapper float-left pr-3">
                <img src="https://placeimg.com/150/150/animals" alt="">
            </div>
            <div class="single-post-content-wrapper p-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil ad, ex eaque fuga minus reprehenderit asperiores earum incidunt. Possimus maiores dolores voluptatum enim soluta omnis debitis quam ab nemo necessitatibus.
                <br><br>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil ad, ex eaque fuga minus reprehenderit asperiores earum incidunt. Possimus maiores dolores voluptatum enim soluta omnis debitis quam ab nemo necessitatibus.
            </div>
        </div>
    </article>
</div>








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
                  {/* <h5 className="card-title text-center">{title}</h5> 
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
*/
