import * as fs from "fs";
import * as csv from "fast-csv";
import uuid from "uuid-by-string";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getRandomPokemon = async () => {
  const min = 1;
  const max = 905;
  const id = Math.floor(Math.random() * (max - min + 1)) + min;
  return await fetch(`http://localhost:3000/api/pokemon/${id}`).then((r) =>
    r.json()
  );
};

const insertDB = async (row) => {
  await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 20000)));
  const pokemon = await getRandomPokemon();
  const date = new Date(row.publishDate + " UTC");
  const links = row.links.split(";");

  // upsert author
  const author = await prisma.author.upsert({
    where: {
      firstName_lastName: {
        firstName: row.authorFirstName,
        lastName: row.authorLastName,
      },
    },
    update: {},
    create: {
      firstName: row.authorFirstName,
      lastName: row.authorLastName,
    },
  });

  // upsert fun fact
  const funFact = await prisma.funFact.upsert({
    where: {
      id: uuid(row.funFact),
    },
    update: {},
    create: {
      id: uuid(row.funFact),
      authorId: author.id,
      content: row.funFact,
    },
  });

  // upsert external links
  for (let i in links) {
    await prisma.externalLink.upsert({
      where: {
        id: uuid(links[i] + funFact.content),
      },
      update: {},
      create: {
        id: uuid(links[i] + funFact.content),
        url: links[i],
        funFactId: funFact.id,
      },
    });
  }

  // upsert pokemon
  await prisma.pokemon.upsert({
    where: {
      id: pokemon.id,
    },
    update: {},
    create: {
      id: pokemon.id,
      name: pokemon.name,
      artworkUrl: pokemon.artwork,
      height: pokemon.height,
      weight: pokemon.weight,
      firstType: pokemon.types[0],
      secondType: pokemon.types.length == 2 ? pokemon.types[1] : undefined,
    },
  });

  // upsert pokedex entry
  const entry = await prisma.pokedexEntry.upsert({
    where: {
      pokemonId_version: {
        pokemonId: pokemon.id,
        version: pokemon.pokedexEntry.version,
      },
    },
    update: {},
    create: {
      pokemonId: pokemon.id,
      entry: pokemon.pokedexEntry.flavor_text,
      version: pokemon.pokedexEntry.version,
    },
  });

  // upsert pokemon of the day
  const pokemonOfTheDay = await prisma.pokemonOfTheDay.upsert({
    where: {
      pokemonId_pokedexEntryId: {
        pokemonId: pokemon.id,
        pokedexEntryId: entry.id,
      },
    },
    update: {},
    create: {
      pokemonId: pokemon.id,
      pokedexEntryId: entry.id,
    },
  });

  // upsert fun fact of the day
  const funFactOfTheDay = await prisma.funFactOfTheDay.upsert({
    where: {
      date: date,
    },
    update: {},
    create: {
      date: date,
      funFactId: funFact.id,
      pokemonOfTheDayId: pokemonOfTheDay.id,
    },
  });
  console.log(pokemonOfTheDay);
  console.log(funFactOfTheDay);
};

fs.createReadStream("backlog.csv")
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => insertDB(row))
  .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));
