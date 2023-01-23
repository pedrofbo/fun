import { z } from "zod";
import { PokemonClient, FlavorText } from "pokenode-ts";

import { router, publicProcedure } from "../trpc";

const api = new PokemonClient();
const default_artwork = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"

export const pokemonRouter = router({
  pokemonById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const pokemon = await fetchPokemon(input.id);
      return {
        name: pokemon.name,
        artwork: pokemon.artwork,
        height: pokemon.height,
        weight: pokemon.weight,
        pokedexEntry: pokemon.pokedexEntry
      }
    })
});

const fetchPokemon = async (id: number) => {
  const pokemonInfoPromise = api.getPokemonSpeciesById(id);
  const pokemonPromise = api.getPokemonById(id);
  const pokemonInfo = await pokemonInfoPromise;
  const pokedexEntry = sampleAndParsePokedexEntry(pokemonInfo.flavor_text_entries)
  const pokemon = await pokemonPromise;
  return {
    name: pokemon.name,
    artwork: pokemon.sprites.other ? pokemon.sprites.other["official-artwork"].front_default as string : default_artwork,
    height: pokemon.height * 10,
    weight: pokemon.weight / 10,
    pokedexEntry: pokedexEntry
  }
}

interface FlavorTextWithVersion extends FlavorText {
  version: {
    name: string,
    url: string
  }
}

const sampleAndParsePokedexEntry = (entries: FlavorText[]) => {
  const entriesEN = entries.filter((value, index, array) => {
    return value.language.name === "en"
  });
  const entry = entriesEN[Math.floor(Math.random() * entriesEN.length)] as FlavorTextWithVersion;
  return {
    flavor_text: entry.flavor_text.replaceAll("\n", " ").replaceAll("\f", " ").replaceAll("POKéMON", "Pokémon"),
    version: entry.version.name
  };
}
