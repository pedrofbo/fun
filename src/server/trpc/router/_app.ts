import { router } from "../trpc";
import { boomRouter } from "./boom";
import { exampleRouter } from "./example";
import { funRouter } from "./funFact";
import { pokemonRouter } from "./pokemon";

export const appRouter = router({
  example: exampleRouter,
  boom: boomRouter,
  pokemon: pokemonRouter,
  fun: funRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
