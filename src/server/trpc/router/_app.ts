import { router } from "../trpc";
import { exampleRouter } from "./example";
import { featureFlagRouter } from "./featureFlag";
import { funRouter } from "./funFact";
import { pokemonRouter } from "./pokemon";

export const appRouter = router({
  example: exampleRouter,
  pokemon: pokemonRouter,
  fun: funRouter,
  featureFlag: featureFlagRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
