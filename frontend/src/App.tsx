import  { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import { trpc } from "./utils/trpc";
import Layout from "./components/pages/Layout";
import TrpcTest from "./components/pages/TrpcTest"; 
import { httpBatchLink } from "@trpc/client";

const App = () =>  {
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
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* <TrpcTest />  */}
        <Layout />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App