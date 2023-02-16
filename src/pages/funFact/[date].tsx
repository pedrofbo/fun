import Head from "next/head";
import Image from "next/image";
import { type NextPage } from "next";
import { useRouter } from "next/router";

import Header from "../../components/header";
import { FunBlock } from "../../components/funBlock";
import { trpc } from "../../utils/trpc";

const FunFactPage: NextPage = () => {
  const router = useRouter();
  const { date } = router.query;
  if (!date) {
    return <></>;
  }
  const dateObject = new Date(date as string);
  if (!isFinite(dateObject.getTime())) {
    return ErrorPage(date as string);
  }
  return FunBlock(date as string);
};

const ErrorPage = (input: string) => {
  const featureFlags = trpc.featureFlag.getFeatureFlags.useQuery();

  return (
    <>
      <main className="bg-white text-black dark:bg-[#15162c] dark:text-white">
        {Header(featureFlags.data)}
        <div className="flex min-h-screen flex-col items-center">
          <div className="max-w-5xl">
            <h1 className="pb-8 text-center text-3xl font-extrabold">
              Por acaso <span className="italic">{`"${input}"`}</span> parece
              uma data válida?
            </h1>
            <h1 className="pb-8 text-center text-3xl font-extrabold">
              O formato válido para datas é{" "}
              <span className="italic">{`"YYYY-mm-dd"`}</span>, tente de novo.
            </h1>
            <Image
              src="/arrivederci.jpg"
              alt="Arrivederci!"
              height={900}
              width={1600}
            ></Image>
          </div>
        </div>
      </main>
    </>
  );
};

export default FunFactPage;
