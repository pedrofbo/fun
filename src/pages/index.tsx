import { type NextPage } from "next";
import Head from "next/head";
import { FunFactBlock, FunFact } from "../components/funfact";

import { PokemonBlock, Pokemon, PokedexEntry } from "../components/pokemon";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const date = "2023-02-26"
  const loadingBlock = (
    <span className="flex h-5 w-5">
      <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
    </span>
  );

  let pokemonBlock = <div></div>;
  let funFactBlock = <div></div>;
  const funFactOfTheDay = trpc.fun.getFunFactOfTheDay.useQuery({ date: date });
  if (funFactOfTheDay.data) {
    pokemonBlock = PokemonBlock(
      funFactOfTheDay.data.pokemonOfTheDay.pokemon as Pokemon,
      funFactOfTheDay.data.pokemonOfTheDay.pokedexEntry as PokedexEntry
    );
    funFactBlock = FunFactBlock(funFactOfTheDay.data.funFact as FunFact);
  } else {
    funFactBlock = loadingBlock;
    pokemonBlock = loadingBlock;
  }

  return (
    <>
      <Head>
        <title>F.F.</title>
        <meta name="description" content="Mais um dia, mais um fun fact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-10 px-4 py-16">
          <h1 className="text-6xl font-extrabold tracking-tight text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{date}</span>
          </h1>
          {funFactBlock}
          {pokemonBlock}
        </div>
      </main>
    </>
  );
};

export default Home;
