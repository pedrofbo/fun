import { type NextPage } from "next";
import Head from "next/head";
import Image from 'next/image'
import Link from "next/link";
import { useState } from "react";

import { trpc } from "../utils/trpc";

const PokemonBlock = (id: number) => {
  const pokemon = trpc.pokemon.pokemonById.useQuery({ id: id });

  if (pokemon.data) {
    let typeBlock: JSX.Element = <div></div>;
    if (pokemon.data.types.length === 1) {
      typeBlock = (
        <div className="rounded-xl bg-white/20 p-2 mb-5">
          <p className="text-md italic">Tipo:</p>
          <div className="flex flex-col items-center">
            <Image src={`/pokemon_types/${pokemon.data.types[0]}.png`} alt={pokemon.data.types[0] as string} width={100} height={100} />
          </div>
        </div>
      );
    } else if (pokemon.data.types.length === 2) {
      typeBlock = (
        <div className="rounded-xl bg-white/20 p-2 mb-5">
          <p className="text-md italic">Tipo:</p>
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-end">
              <Image src={`/pokemon_types/${pokemon.data.types[0]}.png`} alt={pokemon.data.types[0] as string} width={100} height={100} />
            </div>
            <div className="flex flex-col items-start">
              <Image src={`/pokemon_types/${pokemon.data.types[1]}.png`} alt={pokemon.data.types[1] as string} width={100} height={100} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex max-w-3xl flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
        <p className="text-md italic">Pokémon do dia:</p>
        <div className="grid grid-cols-2 gap-4">

          <div className="flex items-center">
            <Image src={pokemon.data.artwork} alt={pokemon.data.pokedexEntry.flavor_text} width={500} height={500} />
          </div>

          <div>
            <div className="rounded-xl bg-white/20 p-2 mb-5">
              <p className="text-2xl text-center italic">{pokemon.data.name}</p>
            </div>

            {typeBlock}

            <div className="rounded-xl bg-white/20 p-2">
              <p className="text-md italic">Descrição:</p>
              <p className="text-lg pt-2">{pokemon.data.pokedexEntry.flavor_text}</p>
              <p className="text-md text-right italic pt-2">Pokémon {pokemon.data.pokedexEntry.version}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-5">

              <div className="rounded-xl bg-white/20 p-2">
                <p className="text-md italic">Altura:</p>
                <p className="text-lg text-right">{pokemon.data.height} cm</p>
              </div>

              <div className="rounded-xl bg-white/20 p-2">
                <p className="text-md italic">Peso:</p>
                <p className="text-lg text-right">{pokemon.data.weight} Kg</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <span className="flex h-5 w-5">
        <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
      </span>
    );
  }
};

const Home: NextPage = () => {
  const pokemonData = PokemonBlock(444)

  const funFact = trpc.fun.readFunFact.useQuery({ id: "40a35e0e-d12f-40bf-99cb-c930877abe91" });

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">2023-01-22</span>
          </h1>
          <div className="gap-4 md:gap-8">
            <Link
              className="flex max-w-3xl flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
            >
              <p className="text-md italic">Fun fact do dia:</p>
              <div className="text-lg">
                {funFact.data ? funFact.data.content : "Vazio :("}
              </div>
              <div className="text-md text-right italic">
                {funFact.data ? funFact.data.author.lastName : "Vazio :("}, {funFact.data ? funFact.data.author.firstName : "Vazio :("}
              </div>
            </Link>
          </div>
          {pokemonData}
        </div>
      </main>
    </>
  );
};

export default Home;
