import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  link: createHttpLink({ uri: "http://127.0.0.1:8000/" }),
  cache: new InMemoryCache()
});

export default client;
