import React, { Component } from "react";

export default class PostCompact extends Component {
  render() {
      const { image, title, createdAt, user, body} = this.props.post;
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
                <p className="card-text">{body}</p>
                <p className="card-text  text-right">
                  <span className="text-muted">
                    {" "}
                    - {user.name}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="card-group">
           
            <button
            
              type="submit"
              className="btn btn-success btn-lg m-3"
            >
              See more
            </button>
          </div>
        </div>
      </div>
    );
  }
}
