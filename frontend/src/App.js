import React from "react";
import { Router } from "@reach/router";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import * as pages from "./pages";

import "./App.css";

const PAGE_QUERY = gql`
  query Page($slug: String!, $specific: Boolean) {
    page: pageBySlug(slug: $slug, specific: $specific) {
      id
      title
      slug
      seoTitle
      searchDescription
      ... on NewBlogPageType {
        color1
        color2
        color3
      }
    }
  }
`;

function Page404() {
  return (
    <div>
      <h1>Page not found</h1>
    </div>
  );
}

function PageLoader(props) {
  const { slug } = props;
  const {
    data: { page },
    loading,
    error
  } = useQuery(PAGE_QUERY, { variables: { slug, specific: true } });

  if (error) {
    throw error;
  }

  if (loading) {
    return "Loading";
  }

  try {
    const Page = pages[page.__typename];
    return <Page {...props} {...page} />;
  } catch (err) {
    return <Page404 />;
  }
}

function App(props) {
  return (
    <Router>
      <PageLoader path="/:slug" />
    </Router>
  );
}

export default App;
