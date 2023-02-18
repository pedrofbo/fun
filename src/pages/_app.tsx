import Head from "next/head";
import { type AppType } from "next/app";
import { ThemeProvider } from "next-themes";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Head>
        <title>F.F.</title>
        <meta name="description" content="Mais um dia, mais um fun fact" />
        <link rel="icon" href="/ff.png" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
