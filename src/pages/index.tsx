import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
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
