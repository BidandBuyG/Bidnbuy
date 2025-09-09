"use client";
import { session } from "../../../store/session";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (query.state.data !== undefined) {
              if (error.message === "Request failed with status code 401") {
                session.clear(); // clear token
                window.location.href = "/login"; // redirect to login page
              }
            }
          },
        }),
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="left" />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
