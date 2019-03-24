import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
  text-align: center;
  color: gray;
`;

export default function H2PBlockType({ title }) {
  return (
    <Wrapper>
      <H2>{title}</H2>
    </Wrapper>
  );
}
