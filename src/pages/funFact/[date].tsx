import Image from "next/image";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import Header from "../../components/header";
import { FunBlock } from "../../components/funBlock";
import { prisma } from "../../server/db/client";
import { appRouter } from "../../server/trpc/router/_app";
import { createContextInner } from "../../server/trpc/context";
import { trpc } from "../../utils/trpc";

const FunFactPage = ({
  date,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const dateObject = new Date(date);
  if (!isFinite(dateObject.getTime())) {
    return ErrorPage(date);
  }
  return FunBlock(date);
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

export async function getStaticPaths() {
  const dateList = await prisma.funFactOfTheDay.findMany({
    select: {
      date: true,
    },
  });

  return {
    paths: dateList.map((item) => ({
      params: {
        date: item.date.toJSON().slice(0, 10),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ date: string }>
) {
  const date = context.params?.date as string;
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({}),
    transformer: superjson,
  });
  await ssg.fun.getFunFactOfTheDay.prefetch({ date });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      date,
    },
    revalidate: 10,
  };
}
