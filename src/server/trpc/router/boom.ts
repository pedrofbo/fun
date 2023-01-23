import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const boomRouter = router({
  boom: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Boom ${input?.text ?? "world"}`,
        goodbye: "Another boom"
      };
    }),
  ayo: publicProcedure
    .input(z.object({ value: z.number() }))
    .query(({ input }) => {
      return {
        newValue: input.value + 5,
      };
    }),
});
