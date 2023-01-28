import { type AppType } from "next/app";
import Head from "next/head";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>F.F.</title>
        <meta name="description" content="Mais um dia, mais um fun fact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center text-white bg-[#15162c]">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default trpc.withTRPC(MyApp);
