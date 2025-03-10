import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../backend/src/routes/index"; // AppRouter type from the backend routes

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc", // Update this in production
    }),
  ],
});
