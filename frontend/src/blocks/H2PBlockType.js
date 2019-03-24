import React from "react";

export default function H2PBlockType({ title, text }) {
  return (
    <>
      <h2>{title}</h2>
      <div>{text}</div>
    </>
  );
}
