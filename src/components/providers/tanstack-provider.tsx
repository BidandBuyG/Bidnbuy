/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { session } from "../../store/session";
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
          onError: (error: any, query) => {
            // If axios marked this error to skip auth redirects, do nothing here
            if (
              error &&
              (error.__skipAuthRedirect ||
                error?.config?.headers?.["X-Skip-Auth-Redirect"])
            ) {
              return;
            }

            if (query.state.data !== undefined) {
              if (
                error &&
                (error.message === "Request failed with status code 401" ||
                  error?.response?.status === 401)
              ) {
                session.clear(); // clear token
                try {
                  window.location.href = "/login"; // redirect to login page
                } catch {
                  console.log("cannot redirect in this environment");
                }
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
