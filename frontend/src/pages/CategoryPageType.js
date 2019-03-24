import React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import { PAGE_FRAGMENT } from "../apollo/fragments";
import * as blocks from "../blocks";

const CHILD_PAGES = gql`
  query Page($path: String!, $specific: Boolean) {
    page: pageByPath(path: $path, specific: $specific) {
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

const ImageWrapper = styled.div`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  min-height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  text-align: center;
  color: white;
`;

const H3 = styled.h3`
  text-align: center;
`;

function BlockLoader({ __typename, ...rest }) {
  const Block = blocks[__typename];
  return <Block {...rest} />;
}

export default function CategoryPageType({ title, body, image, location }) {
  const { pathname, href } = location;
  const {
    data: { page },
    loading,
    error
  } = useQuery(CHILD_PAGES, { variables: { path: pathname } });

  if (error) {
    throw error;
  }

  if (loading) {
    return "Loading";
  }

  const parentPath = href
    .split("/")
    .slice(-1, 1)
    .join("/");

  return (
    <Wrapper>
      <ImageWrapper url={"http://127.0.0.1:8000" + image.rendition.url}>
        <H1>{title}</H1>
      </ImageWrapper>
      {body.map(block => (
        <BlockLoader {...block} />
      ))}
      <H3>Childs</H3>
      <ul>
        {page.children.map(page => {
          return (
            <li key={page.id}>
              <a href={`${page.slug}/`}>{page.title}</a>
            </li>
          );
        })}
      </ul>
      <H3>Parent</H3>
      <a href={`/${parentPath}`}>{page.parent.title}</a>
    </Wrapper>
  );
}
