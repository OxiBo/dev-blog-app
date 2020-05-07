import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import {
  fetchCurrentUser,
  fetchPost,
  deletePost,
  likePost,
} from "../../actions";

class PostShow extends Component {
  // state = {
  //   postLikedStyle: this.props.postLike ? this.props.postLike : false,
  // };
  componentDidMount() {
    // this.props.fetchCurrentUser();
    this.props.fetchPost(this.props.match.params.postId);
  }
  render() {
    if (this.props.post && this.props.current_user) {
      // ????????
      const {
        title,
        image,
        body,
        user,
        likes,
        _id,
        published,
      } = this.props.post;
      // console.log(user)

      const { postLikes } = this.props.current_user;
      // console.log(postLikes)
      const liked = postLikes.find((postLike) => postLike.post === _id);
      const likesStyle = liked && liked.like ? "liked" : "";
      // const likesStyle = this.state.postLikedStyle ? "liked" : "";
      return (
        <div className="container col-lg-10 ">
          <div className="card mb-3 p-2 shadow p-3 mb-5 bg-white rounded">
            <h4 className="card-header text-center p-4 shadow-sm p-3 mb-5 bg-white rounded">
              {title}
            </h4>
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
                  <p className="card-text mr-3 ml-3 mb-0 text-justify post-body">
                    {body}
                  </p>
                  <div className="row no-gutters col-md-12 p-3">
                    {published && (
                      <div className="card-text text-left ">
                        <p>
                          {likes}
                          <button
                            className="likes"
                            onClick={async () => {
                              await this.props.likePost(_id);

                              this.props.fetchCurrentUser();
                            }}
                          >
                            {" "}
                            <i className={`fa fa-heart ${likesStyle}`}></i>
                          </button>
                        </p>
                      </div>
                    )}

                    <p className="card-text  ml-auto">
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
            <div className="card-group buttons m-0 p-0">
              <button
                onClick={() => this.props.history.goBack()}
                className="btn my-main-btn btn-lg m-0 p-2"
              >
                Go Back
              </button>
              {this.props.current_user &&
                this.props.current_user._id === user._id && (
                  <>
                    <Link
                      to={`/posts/edit/${_id}`}
                      className="btn btn-edit btn-lg m-0 p-2"
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
            {published && <Comments />}
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
    post: posts.post,
    postLike:
      auth.current_user &&
      posts.post &&
      auth.current_user.postLikes.find((like) => like.post === posts.post._id),
  };
};
export default connect(mapStateToProps, {
  fetchCurrentUser,
  fetchPost,
  likePost,
  deletePost,
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
