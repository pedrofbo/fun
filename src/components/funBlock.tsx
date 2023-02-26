import Head from "next/head";
import Image from "next/image";

import { FunFactBlock, type FunFact } from "./funFact";
import { PokemonBlock, type Pokemon, type PokedexEntry } from "./pokemon";
import { loadingBlock } from "./loadingBlock";
import Header from "./header";
import { trpc } from "../utils/trpc";

export const FunBlock = (date: string) => {
  const funFactOfTheDay = trpc.fun.getFunFactOfTheDay.useQuery({
    date: date as string,
  });
  const featureFlags = trpc.featureFlag.getFeatureFlags.useQuery();

  let funFactBlock = loadingBlock;
  let pokemonBlock = <div></div>;
  let metaDataBlock = <></>;
  if (funFactOfTheDay.data) {
    pokemonBlock = PokemonBlock(
      funFactOfTheDay.data.pokemonOfTheDay.pokemon as Pokemon,
      funFactOfTheDay.data.pokemonOfTheDay.pokedexEntry as PokedexEntry
    );
    funFactBlock = FunFactBlock(funFactOfTheDay.data.funFact as FunFact);
    metaDataBlock = headMetadata(
      funFactOfTheDay.data.date.toJSON().slice(0, 10),
      funFactOfTheDay.data.funFact.content,
      funFactOfTheDay.data.pokemonOfTheDay.pokemon.artworkUrl
    );
  } else if (funFactOfTheDay.isFetched) {
    funFactBlock = undefinedBlock;
  }

  return (
    <>
      {metaDataBlock}
      <main className="bg-white text-black dark:bg-[#15162c] dark:text-white">
        {Header(featureFlags.data)}
        <div className="flex min-h-screen flex-col items-center gap-10 p-4">
          <h1 className="text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-[#bd0a0a] to-[#362ad6] bg-clip-text text-transparent dark:from-[#362ad6] dark:to-[#bd0a0a]">
              {date}
            </span>
          </h1>
          {funFactBlock}
          {pokemonBlock}
        </div>
      </main>
    </>
  );
};

const undefinedBlock = (
  <div className="max-w-5xl">
    <h1 className="pb-8 text-center text-3xl font-extrabold">
      Você esperava um Fun Fact, mas tudo que você encontrou foi o Dio.
    </h1>
    <Image
      src="/dio.jpg"
      alt="このディオだ！"
      height={900}
      width={1600}
    ></Image>
  </div>
);

const headMetadata = (date: string, content: string, artworkUrl: string) => {
  return (
    <Head>
      <title>{date}</title>
      <meta property="og:title" content={date} />
      <meta name="description" content={content} />
      <meta property="og:description" content={content} />
      <meta property="og:image" content={artworkUrl} />
      <meta name="twitter:image" content={artworkUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#000000" />
    </Head>
  );
};
