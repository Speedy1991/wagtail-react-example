import React from "react";
import { Router } from "@reach/router";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import * as pages from "./pages";
import {
  H2BLOCK_FRAGMENT,
  H2PBLOCK_FRAGMENT,
  PAGE_FRAGMENT,
  IMAGE_FRAGMENT,
  RENDITION_FRAGMENT
} from "./apollo/fragments";

import "./App.css";

const PAGE_QUERY = gql`
  query Page(
    $urlPath: String!
    $specific: Boolean
    $jpegquality: Int
    $format: String
    $fill: String
  ) {
    page: pageByUrlPath(urlPath: $urlPath, specific: $specific) {
      ...PageFragment
      ... on BlogPageType {
        body: blogBody {
          ... on H2BlockType {
            ...H2BlockFragment
          }
          ... on H2PBlockType {
            ...H2PBlockFragment
          }
        }
        image {
          ...ImageFragment
          rendition(fill: $fill, jpegquality: $jpegquality, format: $format) {
            ...RenditionFragment
          }
        }
      }
      ... on CategoryPageType {
        body: categoryBody {
          ... on H2BlockType {
            ...H2BlockFragment
          }
          ... on H2PBlockType {
            ...H2PBlockFragment
          }
        }
        image {
          ...ImageFragment
          rendition(fill: $fill, jpegquality: $jpegquality, format: $format) {
            ...RenditionFragment
          }
        }
      }
    }
  }
  ${H2BLOCK_FRAGMENT}
  ${H2PBLOCK_FRAGMENT}
  ${PAGE_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${RENDITION_FRAGMENT}
`;

function Page404() {
  return (
    <div>
      <h1>Page not found</h1>
    </div>
  );
}

function PageLoader(props) {
  const {
    location: { pathname }
  } = props;
  const urlPath = pathname.endsWith("/") ? pathname : pathname + "/";

  const {
    data: { page },
    loading,
    error
  } = useQuery(PAGE_QUERY, {
    variables: { urlPath, specific: true, format: "jpeg" }
  });

  if (error) {
    throw error;
  }

  if (loading) {
    return "Loading";
  }

  try {
    const Page = pages[page.__typename];
    return <Page {...props} {...page} urlPath={urlPath} />;
  } catch (err) {
    return <Page404 />;
  }
}

function App(props) {
  return (
    <Router>
      <PageLoader path="/*" />
    </Router>
  );
}

export default App;
