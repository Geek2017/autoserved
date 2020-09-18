import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./stylesheets/main.scss";

import * as serviceWorker from "./serviceWorker";

// Element ID should match the DOM ID found in the HTML file
ReactDOM.render(<App />, document.getElementById("app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
