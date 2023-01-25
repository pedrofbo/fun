import { z } from "zod";
import { PokemonClient, FlavorText } from "pokenode-ts";

import { router, publicProcedure } from "../trpc";

const api = new PokemonClient();
const default_artwork = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png";

export const pokemonRouter = router({
  pokemonById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const pokemon = await fetchPokemon(input.id);
      return {
        name: pokemon.name,
        artwork: pokemon.artwork,
        types: pokemon.types,
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
  const pokemonTypes = pokemon.types.map((value) => value.type.name);

  return {
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    artwork: pokemon.sprites.other ? pokemon.sprites.other["official-artwork"].front_default as string : default_artwork,
    types: pokemonTypes,
    height: pokemon.height * 10,
    weight: pokemon.weight / 10,
    pokedexEntry: pokedexEntry
  };
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

  const versionNameConversion: { [key: string]: string } = {
    "red": "Red",
    "blue": "Blue",
    "yellow": "Yellow",
    "gold": "Gold",
    "silver": "Silver",
    "crystal": "Crystal",
    "ruby": "Ruby",
    "sapphire": "Sapphire",
    "emerald": "Emerald",
    "firered": "Fire Red",
    "leafgreen": "Leaf Green",
    "diamond": "Diamond",
    "pearl": "Pearl",
    "platinum": "Platinum",
    "heartgold": "HeartGold",
    "soulsilver": "SoulSilver",
    "black": "Black",
    "white": "White",
    "black-2": "Black 2",
    "white-2": "White 2",
    "x": "X",
    "y": "Y",
    "omega-ruby": "Omega Ruby",
    "alpha-sapphire": "Alpha Sapphire",
    "lets-go-pikachu": "Let's Go Pikachu",
    "lets-go-eevee": "Let's Go Eevee",
    "sun": "Sun",
    "moon": "Moon",
    "ultra-sun": "Ultra Sun",
    "ultra-moon": "Ultra Moon",
    "sword": "Sword",
    "shield": "Shield",
    "legends-arceus": "Legends Arceus"
  };
  return {
    flavor_text: entry.flavor_text.replaceAll("\n", " ").replaceAll("\f", " ").replaceAll("POKéMON", "Pokémon"),
    version: versionNameConversion[entry.version.name]
  };
}
