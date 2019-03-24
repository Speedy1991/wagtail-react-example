import gql from "graphql-tag";

export const RENDITION_FRAGMENT = gql`
  fragment RenditionFragment on WagtailImageRenditionType {
    id
    url
    height
    width
  }
`;

export const IMAGE_FRAGMENT = gql`
  fragment ImageFragment on ImageType {
    id
    title
  }
`;

export const PAGE_FRAGMENT = gql`
  fragment PageFragment on PageInterface {
    id
    title
    slug
    seoTitle
    searchDescription
    urlPath
  }
`;

export const H2BLOCK_FRAGMENT = gql`
  fragment H2BlockFragment on H2BlockType {
    title
  }
`;

export const H2PBLOCK_FRAGMENT = gql`
  fragment H2PBlockFragment on H2PBlockType {
    title
    text
  }
`;
