import React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { PAGE_FRAGMENT } from "../apollo/fragments";
import styled from "styled-components";

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

const H1 = styled.h1`
  text-align: center;
`;

const H3 = styled.h3`
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const List = styled.ul`
  & > li {
    list-style: none;
  }
`;

export default function HomePageType({ title, location: { pathname, href } }) {
  const {
    data: { page },
    loading,
    error
  } = useQuery(CHILD_PAGES, { variables: { path: pathname } });

  const parentPath = href
    .split("/")
    .slice(-1, 1)
    .join("/");

  if (error) {
    throw error;
  }

  if (loading) {
    return "Loading";
  }

  return (
    <Wrapper>
      <H1>{title}</H1>
      <H3>
        The current parent of this page is:{" "}
        <a href={parentPath}>{page.parent.title}</a>
      </H3>
      <div>
        This is an example Page which uses React as frontend for a wagtail
        backend
      </div>
      <div>Currently this Page has the following children:</div>
      <H3>Childs</H3>
      <List>
        {page.children.map(page => {
          return (
            <li key={page.id}>
              <a href={`${page.slug}/`}>{page.title}</a>
            </li>
          );
        })}
      </List>
    </Wrapper>
  );
}
