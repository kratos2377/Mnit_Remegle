import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import dotenv from "dotenv";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

dotenv.config();

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_HOST as string,
  credentials: "include",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
