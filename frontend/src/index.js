import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import "react-app-polyfill/ie11";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import client from "./apollo/client";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body, html, h1, h2, h3, ul, ol {
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
