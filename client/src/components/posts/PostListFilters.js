import React, { Component } from "react";
import { connect } from "react-redux";
import { setFindByTitle, setSortBy } from "../../actions";

class PostListFilters extends Component {
  render() {
    return (
      <div className="container col-lg-10 mb-3">
        <div className="row no-gutters-m-3 mx-0">

        <div className="card col-md-6">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="findByTitle" className="font-weight-bold">
                  Find by title
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="findByTitle"
                    autoComplete={"off"}
                    aria-describedby="findByTitleField"
                    placeholder="Enter title"
                    value={this.props.findByTitle}
                    onChange={(e) => this.props.setFindByTitle(e.target.value)}
                  />
                  <button
                    className="btn bg-transparent"
                    style={{ marginLeft: "-40px", zIndex: "100" }}
                    onClick={() => this.props.setFindByTitle("")}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card col-md-6">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="sortBy" className="font-weight-bold">
                  Sort by
                </label>
                <select
                  id="sortBy"
                  className="form-control"
                  onChange={(e) => this.props.setSortBy(e.target.value)}
                  value={this.props.sortBy}
                >
                  <option defaultValue>Choose...</option>
                  <option value="title">title</option>
                  <option value="oldest">oldest</option>
                  <option value="newest">newest</option>
                  <option value="author">author</option>
                  <option value="popular">most popular</option>
                </select>
              </div>
            </div>
          </div>

       
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ filters: { sortBy, findByTitle } }) => {
  return {
    sortBy,
    findByTitle,
  };
};

export default connect(mapStateToProps, { setFindByTitle, setSortBy })(
  PostListFilters
);
