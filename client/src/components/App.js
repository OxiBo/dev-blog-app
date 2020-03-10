import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

// flesh messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import requireAuth from "./HOC/requireAuth";
import requireAuthorization from "./HOC/requireAuthorization";
import Landing from "./Landing";
import Header from "./Header";
import PostsAll from "./posts/PostsAll";
import PostCreate from "./posts/PostCreate";
import UserPosts from "./posts/UserPosts";
import PostShow from "./posts/PostShow";
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
              <Route exact path="/posts" component={requireAuth(PostsAll)} />
              <Route exact path="/users" component={requireAuth(UsersList)} />
              <Route exact path="/user-profile/:userId" component={UserProfile} />
              <Route exact path="/user-profile/:userId/edit" component={requireAuthorization(EditUserProfileForm)} />
              <Route exact path="/posts/new" component={requireAuth(PostCreate)} />
              <Route exact path="/posts/show/:postId" component={requireAuth(PostShow)} />
              <Route exact path="/user/:userId/posts" component={requireAuth(UserPosts)} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
