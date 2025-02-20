import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { router } from "./trpc";
import { createContext } from "./context";
import { userRouter } from "./routes/user";
import connectDb from "./db/db";

const app = express();
const port = process.env.PORT;

const appRouter = router({
  user: userRouter,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
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
