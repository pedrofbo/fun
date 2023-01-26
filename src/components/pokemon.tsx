import Image from 'next/image';

import { trpc } from "../utils/trpc";

export interface Pokemon {
  id: number,
  name: string,
  artworkUrl: string,
  height: number,
  weight: number,
  firstType: string,
  secondType?: string
}

export interface PokedexEntry {
  id: string,
  pokemonId: number,
  entry: string,
  version: string
}

export const PokemonBlock = (pokemon: Pokemon, pokedexEntry: PokedexEntry) => {
  let typeBlock: JSX.Element = <div></div>;
  if (!pokemon.secondType) {
    typeBlock = (
      <div className="rounded-xl bg-white/20 p-2 mb-5">
        <p className="text-md italic">Tipo:</p>
        <div className="flex flex-col items-center">
          <Image src={`/pokemon_types/${pokemon.firstType}.png`} alt={pokemon.firstType} width={100} height={100} />
        </div>
      </div>
    );
  } else {
    typeBlock = (
      <div className="rounded-xl bg-white/20 p-2 mb-5">
        <p className="text-md italic">Tipo:</p>
        <div className="grid grid-cols-2">
          <div className="flex flex-col items-end">
            <Image src={`/pokemon_types/${pokemon.firstType}.png`} alt={pokemon.firstType} width={100} height={100} />
          </div>
          <div className="flex flex-col items-start">
            <Image src={`/pokemon_types/${pokemon.secondType}.png`} alt={pokemon.secondType} width={100} height={100} />
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
          <Image src={pokemon.artworkUrl} alt={pokedexEntry.entry} width={500} height={500} />
        </div>

        <div>
          <div className="rounded-xl bg-white/20 p-2 mb-5">
            <p className="text-2xl text-center italic">{pokemon.name}</p>
          </div>

          {typeBlock}

          <div className="rounded-xl bg-white/20 p-2">
            <p className="text-md italic">Descrição:</p>
            <p className="text-lg pt-2">{pokedexEntry.entry}</p>
            <p className="text-md text-right italic pt-2">Pokémon {pokedexEntry.version}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-5">

            <div className="rounded-xl bg-white/20 p-2">
              <p className="text-md italic">Altura:</p>
              <p className="text-lg text-right">{pokemon.height} cm</p>
            </div>

            <div className="rounded-xl bg-white/20 p-2">
              <p className="text-md italic">Peso:</p>
              <p className="text-lg text-right">{pokemon.weight} Kg</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
