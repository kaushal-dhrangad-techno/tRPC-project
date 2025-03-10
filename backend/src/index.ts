import express from "express";
import cors from "cors";
import connectDb from "./db/db";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./routes";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.get("/", (req: Request, res: any) => {
  res.send("Express + TypeScript Server");
});

connectDb();
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export type AppRouter = typeof appRouter;
