import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";

interface UrlShortenerResponse {
  short_url: string;
  long_url: string;
}

export const urlShortenerRouter = router({
  shorten: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(env.URL_SHOTENER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: input.url }),
      });
      const body = (await response.json()) as UrlShortenerResponse;
      return {
        url: body.long_url,
        shortUrl: body.short_url,
      };
    }),
});
