import { type NextPage } from "next";
import Head from "next/head";
import Image from 'next/image'
import Link from "next/link";
import { useState } from "react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const pokemon = trpc.pokemon.pokemonById.useQuery({ id: 257 });

  const pokemonData: JSX.Element = pokemon.data ? (
    <div className="flex max-w-3xl flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
      <p className="text-2xl">{pokemon.data.name}</p>
      <p className="text-2xl">{pokemon.data.height} cm</p>
      <p className="text-2xl">{pokemon.data.weight} Kg</p>
      <p className="text-2xl">{pokemon.data.pokedexEntry.flavor_text}</p>
      <p className="text-2xl">{pokemon.data.pokedexEntry.version}</p>
      <Image
        src={pokemon.data.artwork}
        alt="yo"
        width={500}
        height={500}
      />
    </div>
  ) : (
    <span className="flex h-5 w-5">
      <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
    </span>
  );

  const funFact = trpc.fun.readFunFact.useQuery({ id: "40a35e0e-d12f-40bf-99cb-c930877abe91" });

  return (
    <>
      <Head>
        <title>Fun Fact of the day</title>
        <meta name="description" content="Another day, another fun fact of the day" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-10 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Fun Fact</span> of the day
          </h1>
          <div className="gap-4 md:gap-8">
            <Link
              className="flex max-w-3xl flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
            >
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
