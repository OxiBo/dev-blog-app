import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

// flesh messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import requireAuth from "./HOC/requireAuth";
import requireAuthorization from "./HOC/requireAuthorization";
import Landing from "./Landing";
import Header from "./Header";
import PostList from "./posts/PostList";
import PostCreate from "./posts/PostCreate";
import UserProfile from "./profile/UserProfile";
import UsersList from "./profile/UsersList";
import EditUserProfileForm from "./profile/EditUserProfileForm";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <Header />
          <div className="container-fluid">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/posts" component={requireAuth(PostList)} />
              <Route exact path="/users" component={requireAuth(UsersList)} />
              <Route exact path="/user-profile/:userId" component={UserProfile} />
              <Route exact path="/user-profile/:userId/edit" component={requireAuthorization(EditUserProfileForm)} />
              <Route exact path="/posts/new" component={requireAuth(PostCreate)} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
