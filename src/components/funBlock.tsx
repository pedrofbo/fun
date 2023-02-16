import { FunFactBlock, FunFact } from "./funFact";
import { PokemonBlock, Pokemon, PokedexEntry } from "./pokemon";
import { loadingBlock } from "./loadingBlock";
import Header from "./header";
import { trpc } from "../utils/trpc";

export const FunBlock = (date: string) => {
  const funFactOfTheDay = trpc.fun.getFunFactOfTheDay.useQuery({
    date: date as string,
  });
  const featureFlags = trpc.featureFlag.getFeatureFlags.useQuery();

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
