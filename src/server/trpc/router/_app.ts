import { router } from "../trpc";
import { featureFlagRouter } from "./featureFlag";
import { funRouter } from "./funFact";
import { pokemonRouter } from "./pokemon";
import { urlShortenerRouter } from "./urlShortener";

export const appRouter = router({
  pokemon: pokemonRouter,
  fun: funRouter,
  featureFlag: featureFlagRouter,
  urlShortener: urlShortenerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
