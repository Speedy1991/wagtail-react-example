import React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

const CHILD_PAGES = gql`
  query Children($pk: ID!) {
    page(pk: $pk) {
      children {
        id
        title
        slug
      }
      parent {
        id
        title
        slug
      }
    }
  }
`;

export default function HomePageType({
  id: pk,
  title,
  color1,
  color2,
  color3
}) {
  const {
    data: { page },
    loading,
    error
  } = useQuery(CHILD_PAGES, { variables: { pk } });

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
              <a href={page.slug}>{page.title}</a>
            </li>
          );
        })}
      </ul>
      <h3>Parent</h3>
      <a href={page.parent.slug}>{page.parent.title}</a>
      <h4>Page related stuff</h4>
      {[color1, color2, color3].map(color => (
        <div
          style={{ height: "100px", width: "300px", backgroundColor: color }}
        >
          {color}
        </div>
      ))}
    </>
  );
}
