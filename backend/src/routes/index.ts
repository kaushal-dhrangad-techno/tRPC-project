import { todo } from "node:test";
import { todoRouter } from "./task.route";
import { t } from "../trpc";

export const appRouter = t.router({
    todo:  todoRouter
})

export type AppRouter = typeof appRouter