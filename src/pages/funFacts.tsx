import Head from "next/head";

import { FunFacts } from "../components/funFactListBlock";
import { loadingBlock } from "../components/loadingBlock";
import Header from "../components/header";
import { trpc } from "../utils/trpc";

const FunFactListBlock = (date: string) => {
  const funFacts = trpc.fun.getFunFactList.useQuery();
  const featureFlags = trpc.featureFlag.getFeatureFlags.useQuery();

  let funFactBlock = <div></div>;
  if (funFacts.data) {
    funFactBlock = FunFacts(funFacts.data);
  } else {
    funFactBlock = loadingBlock;
  }

  return (
    <>
      <Head>
        <title>F.F.</title>
        <meta name="description" content="Mais um dia, mais um fun fact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white text-black dark:bg-[#15162c] dark:text-white">
        {Header(featureFlags.data)}
        <div className="flex min-h-screen flex-col items-center gap-10 p-4">
          {funFactBlock}
        </div>
      </main>
    </>
  );
};

export default FunFactListBlock;