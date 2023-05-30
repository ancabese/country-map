import Head from "next/head";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import dynamic from "next/dynamic";
import { GRAPHQL_URL } from "../utils/constants";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Country Map</title>
        <meta
          name="description"
          content="An interactive map with country information."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <ApolloProvider client={client}>
          <DynamicMap />
        </ApolloProvider>
      </div>
    </>
  );
}
