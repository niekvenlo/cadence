"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Defining `queryClient` outside the function ensures it is stable accross re-renders.
const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
