import Image from "next/image";

import {
  Pokemon,
  FunFact,
  FunFactOfTheDay,
  PokemonOfTheDay,
} from "@prisma/client";
import Link from "next/link";

type FunFactList = (FunFactOfTheDay & {
  funFact: FunFact;
  pokemonOfTheDay: PokemonOfTheDay & {
    pokemon: Pokemon;
  };
})[];

export const FunFacts = (funFacts: FunFactList) => {
  const shortenedFunFacts = funFacts.map((funFact) => {
    funFact.funFact.content =
      funFact.funFact.content.length > 60
        ? `${funFact.funFact.content.slice(0, 60)}...`
        : funFact.funFact.content;
    return funFact;
  });
  const funFactBlocks = shortenedFunFacts.map((funFact) => {
    return (
      <Link
        href={`/funFact/${funFact.date.toISOString().slice(0, 10)}`}
        key={funFact.date.toISOString().slice(0, 10)}
      >
        <div className="flex max-w-sm flex-col gap-4 rounded-xl border-2 border-[#9b16f3bb] p-4 dark:border-none dark:bg-[#9b16f3bb]">
          <div className="grid-cols-3 md:grid">
            <div className="col-span-2">
              <h1 className="bg-gradient-to-r from-[#bd0a0a] to-[#362ad6] bg-clip-text text-center text-xl font-extrabold tracking-tight text-transparent dark:from-[#29f8ff] dark:to-[#bd0a0a]">
                {funFact.date.toISOString().slice(0, 10)}
              </h1>
              <p className="pt-4 italic">{funFact.funFact.content}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src={funFact.pokemonOfTheDay.pokemon.artworkUrl}
                alt=":o"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="flex min-h-screen flex-col items-center gap-10 p-4">
      <div className="grid grid-cols-3 gap-10">{funFactBlocks}</div>
    </div>
  );
};
