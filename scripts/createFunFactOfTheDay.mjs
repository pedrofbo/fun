import { PrismaClient } from "@prisma/client";

const args = process.argv.slice(2);
const funFactId = args[0];
const pokemonId = args[1];

console.log(funFactId);
console.log(pokemonId);

const pokemon = await fetch(`http://localhost:3000/api/pokemon/${pokemonId}`).then(r => r.json());
const funFact = await fetch(`http://localhost:3000/api/funFact/${funFactId}`).then(r => r.json());
console.log(pokemon);
console.log(funFact);

const prisma = new PrismaClient()

await prisma.pokemon.upsert({
  where: {
    id: pokemon.id
  },
  update: {},
  create: {
    id: pokemon.id,
    name: pokemon.name,
    artworkUrl: pokemon.artwork,
    height: pokemon.height,
    weight: pokemon.weight,
    firstType: pokemon.types[0],
    secondType: pokemon.types.length == 2 ? pokemon.types[1] : undefined
  }
}).then(r => console.log(r));

const entry = await prisma.pokedexEntry.upsert({
  where: {
    pokemonId_version: { pokemonId: pokemon.id, version: pokemon.pokedexEntry.version }
  },
  update: {},
  create: {
    pokemonId: pokemon.id,
    entry: pokemon.pokedexEntry.flavor_text,
    version: pokemon.pokedexEntry.version
  }
});
console.log(entry);

const pokemonOfTheDay = await prisma.pokemonOfTheDay.upsert({
  where: {
    pokemonId_pokedexEntryId: { pokemonId: pokemon.id, pokedexEntryId: entry.id }
  },
  update: {},
  create: {
    pokemonId: pokemon.id,
    pokedexEntryId: entry.id
  }
});
console.log(pokemonOfTheDay);

const date = new Date("2023-01-26");
await prisma.funFactOfTheDay.upsert({
  where: {
    date: date
  },
  update: {},
  create: {
    date: date,
    funFactId: funFactId,
    pokemonOfTheDayId: pokemonOfTheDay.id
  }
}).then(r => console.log(r));
