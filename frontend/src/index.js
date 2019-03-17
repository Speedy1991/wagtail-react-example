import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import "react-app-polyfill/ie11";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import client from "./apollo/client";

ReactDOM.render(
  <ApolloHooksProvider client={client}>
    <App />
  </ApolloHooksProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
