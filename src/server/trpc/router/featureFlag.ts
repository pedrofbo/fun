import { router, publicProcedure } from "../trpc";

export interface FeatureFlag {
  [key: string]: boolean;
  darkModeToggle: boolean;
}

export const featureFlagRouter = router({
  getFeatureFlags: publicProcedure.query(async ({ ctx }) => {
    const flags: FeatureFlag = {
      darkModeToggle: false,
    };
    const databaseFlags = await ctx.prisma.featureFlag.findMany();
    for (const i in databaseFlags) {
      if (databaseFlags[i]) {
        if ((databaseFlags[i]?.flag as string) in flags) {
          flags[databaseFlags[i]?.flag as string] = databaseFlags[i]
            ?.enabled as boolean;
        }
      }
    }
    return flags;
  }),
});
