import React from "react";
import * as blocks from "../blocks";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  text-align: center;
  color: red;
`;

function BlockLoader({ __typename, ...rest }) {
  const Block = blocks[__typename];
  return <Block {...rest} />;
}

export default function BlogPageType({ title, body, image }) {
  return (
    <Wrapper>
      <H1>{title}</H1>
      {body.map(block => (
        <BlockLoader {...block} />
      ))}
    </Wrapper>
  );
}
