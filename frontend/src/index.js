// Resource: https://medium.com/how-to-react/use-react-router-link-with-bootstrap-315a8b88e129
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import DataSources from "./components/DataSources";
import About from "./components/About";

ReactDOM.render(
  <Router>
    <Navigation />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/data" component={DataSources} />
      <Route path="/about" component={About} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
