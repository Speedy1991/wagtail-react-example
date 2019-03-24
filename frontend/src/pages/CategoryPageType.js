import React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Link } from "@reach/router";

import { PAGE_FRAGMENT } from "../apollo/fragments";
import * as blocks from "../blocks";

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

function BlockLoader({ __typename, ...rest }) {
  const Block = blocks[__typename];
  return <Block {...rest} />;
}

export default function CategoryPageType({
  title,
  body,
  image,
  urlPath,
  ...rest
}) {
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
      {body.map(block => (
        <BlockLoader {...block} />
      ))}
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
      <h4>Page related stuff</h4>
    </>
  );
}
