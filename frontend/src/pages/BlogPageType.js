import React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Link } from "@reach/router";
import * as blocks from "../blocks";

import { PAGE_FRAGMENT } from "../apollo/fragments";

function BlockLoader({ __typename, ...rest }) {
  const Block = blocks[__typename];
  return <Block {...rest} />;
}

export default function BlogPageType({ title, body, image, urlPath, ...rest }) {
  console.log(body);
  return (
    <div>
      <h1>{title}</h1>
      {body.map(block => (
        <BlockLoader {...block} />
      ))}
    </div>
  );
}
