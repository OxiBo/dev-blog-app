import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Landing from "./Landing";
import Header from "./Header";
import PostList from "./posts/PostList";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <div className="container-fluid">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/posts" component={PostList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
