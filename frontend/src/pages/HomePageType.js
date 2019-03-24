import React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Link } from "@reach/router";
import { PAGE_FRAGMENT } from "../apollo/fragments";

const CHILD_PAGES = gql`
  query Page($urlPath: String!, $specific: Boolean) {
    page: pageByUrlPath(urlPath: $urlPath, specific: $specific) {
      children {
        ...PageFragment
      }
      parent {
        ...PageFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

export default function HomePageType({ id: pk, title, urlPath }) {
  const {
    data: { page },
    loading,
    error
  } = useQuery(CHILD_PAGES, { variables: { urlPath } });

  if (error) {
    throw error;
  }

  if (loading) {
    return "Loading";
  }

  return (
    <>
      <h1>{title}</h1>
      <h2>HOME PAGE</h2>
      <h3>Childs</h3>
      <ul>
        {page.children.map(page => {
          return (
            <li key={page.id}>
              <Link to={page.urlPath}>{page.title}</Link>
            </li>
          );
        })}
      </ul>
      <h3>Parent</h3>
      <Link to={page.parent.urlPath}>{page.parent.title}</Link>
    </>
  );
}
