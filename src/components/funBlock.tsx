import Head from "next/head";

import { FunFactBlock, FunFact } from "./funFact";
import { PokemonBlock, Pokemon, PokedexEntry } from "./pokemon";
import Header from "./header";
import { trpc } from "../utils/trpc";

export const FunBlock = (date: string) => {
  const funFactOfTheDay = trpc.fun.getFunFactOfTheDay.useQuery({
    date: date as string,
  });
  const featureFlags = trpc.featureFlag.getFeatureFlags.useQuery();

  const loadingBlock = (
    <span className="flex h-5 w-5">
      <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex h-5 w-5 rounded-full bg-sky-500"></span>
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
        <meta property="og:title" content="F.F." />
        <meta
          property="og:description"
          content={
            funFactOfTheDay.data
              ? funFactOfTheDay.data.funFact.content
              : "boom :)"
          }
        />
        <meta
          property="og:image"
          content={
            funFactOfTheDay.data
              ? funFactOfTheDay.data.pokemonOfTheDay.pokemon.artworkUrl
              : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
          }
        />
        <meta
          name="twitter:image"
          content={
            funFactOfTheDay.data
              ? funFactOfTheDay.data.pokemonOfTheDay.pokemon.artworkUrl
              : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#000000" />
      </Head>
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
