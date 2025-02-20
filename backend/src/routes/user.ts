// user.ts
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  sayMyName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input }) => {
      return { name: input.name };
    }),
});