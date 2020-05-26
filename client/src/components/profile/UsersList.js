import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers, setSpinner } from "../../actions";
import Spinner from "../Spinner";
import UserCompact from "./UserCompact";

class UsersList extends Component {
  async componentDidMount() {
    await this.props.setSpinner();
    await this.props.fetchUsers();
    this.props.setSpinner(false);
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card card-header">
            <h1 className="card-title text-center m-4">Our Bloggers</h1>
          </div>

          {this.props.isLoading ? (
            <Spinner />
          ) : (
            this.props.usersList.length > 0 &&
            this.props.usersList.map(({ bio, _id, createdAt }, index) => (
              <UserCompact
                key={bio.email + index}
                user={{ ...bio, _id, createdAt }}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, spinner }) => {
  return {
    isLoading: spinner.isLoading,
    usersList: auth.users,
  };
};

export default connect(mapStateToProps, { fetchUsers, setSpinner })(UsersList);

//  return <UserCompact key={user.email} user={user} />;
