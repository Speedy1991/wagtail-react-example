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

const Text = styled.div`
  color: green;
`;

export default function H2PBlockType({ title, text }) {
  return (
    <Wrapper>
      <H2>{title}</H2>
      <Text>{text}</Text>
    </Wrapper>
  );
}
