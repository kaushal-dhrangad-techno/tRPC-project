import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { BrowserRouter, Routes, Route } from "react-router";
import { httpBatchLink } from "@trpc/client";
import Layout from "./components/pages/Layout";
import Task from "./components/pages/Task";
import ActiveTasks from "./components/pages/ActiveTasks";
import CompletedTasks from "./components/pages/CompletedTasks";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    })
  );

  return (
    <BrowserRouter>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Task />} />
              <Route path="active" element={<ActiveTasks />} />
              <Route path="completed" element={<CompletedTasks />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </trpc.Provider>
    </BrowserRouter>
  );
};

export default App;
