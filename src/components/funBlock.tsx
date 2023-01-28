import { FunFactBlock, FunFact } from "./funFact";
import { PokemonBlock, Pokemon, PokedexEntry } from "./pokemon";
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
    <div className="container flex flex-col items-center justify-center gap-10 px-4 py-16">
      <h1 className="text-6xl font-extrabold tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{date}</span>
      </h1>
      {funFactBlock}
      {pokemonBlock}
    </div>
  );
};
