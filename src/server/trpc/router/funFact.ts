import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const funRouter = router({
  createFunFact: publicProcedure
    .input(
      z.object({
        content: z.string(),
        author: z.object({ firstName: z.string(), lastName: z.string() }),
        link: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const funFact = ctx.prisma.funFact.create({
        data: {
          content: input.content,
          author: {
            create: {
              firstName: input.author.firstName,
              lastName: input.author.lastName,
            },
          },
          externalLinks: {
            create: {
              url: input.link,
            },
          },
        },
      });
      return funFact;
    }),
  readFunFact: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.funFact.findUnique({
        where: {
          id: input.id,
        },
        include: {
          author: true,
        },
      });
    }),
  getFunFactOfTheDay: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(({ ctx, input }) => {
      const date = new Date(input.date);
      return ctx.prisma.funFactOfTheDay.findUnique({
        where: {
          date: date,
        },
        include: {
          funFact: {
            include: {
              author: true,
              externalLinks: true,
            },
          },
          pokemonOfTheDay: {
            include: {
              pokemon: true,
              pokedexEntry: true,
            },
          },
        },
      });
    }),
  getFunFactList: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.funFactOfTheDay.findMany({
      include: {
        funFact: true,
        pokemonOfTheDay: {
          include: {
            pokemon: true,
          },
        },
      },
      orderBy: [{ date: "desc" }],
    });
  }),
});
