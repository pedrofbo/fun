import Head from "next/head";

import { FunFactBlock, FunFact } from "./funFact";
import { PokemonBlock, Pokemon, PokedexEntry } from "./pokemon";
import Header from "./header";
import { trpc } from "../utils/trpc";

export const FunBlock = (date: string) => {
  const funFactOfTheDay = trpc.fun.getFunFactOfTheDay.useQuery({ date: date as string });

  const loadingBlock = (
    <span className="flex h-5 w-5">
      <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
    </span>
  );

  let funFactBlock = <div></div>;
  let pokemonBlock = <div></div>;
  if (funFactOfTheDay.data) {
    pokemonBlock = PokemonBlock(
      funFactOfTheDay.data.pokemonOfTheDay.pokemon as Pokemon,
      funFactOfTheDay.data.pokemonOfTheDay.pokedexEntry as PokedexEntry
    );
    funFactBlock = FunFactBlock(funFactOfTheDay.data.funFact as FunFact);
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
      <main className="text-black bg-white dark:text-white dark:bg-[#15162c]">
        {Header()}
        <div className="flex flex-col items-center justify-center gap-10 px-4 py-16">
          <h1 className="text-6xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd0a0a] to-[#362ad6] dark:from-[#362ad6] dark:to-[#bd0a0a]">{date}</span>
          </h1>
          {funFactBlock}
          {pokemonBlock}
        </div>
      </main>
    </>
  );
};
