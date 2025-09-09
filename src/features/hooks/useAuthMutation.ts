/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query"
import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuthStore } from "../store/auth"


/**
 * A reusable hook for authentication mutations (login, signup).
 * @param mutationFn - The API function (e.g., authService.login)
 * @param options - Optional callbacks for onSuccess/onError
 */
export function useAuthMutation<TVariables = any, TData = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseMutationOptions<TData, any, TVariables> = {}
): UseMutationResult<TData, any, TVariables> {
  return useMutation<TData, any, TVariables>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      const store = useAuthStore.getState()
      console.log("Raw login response:", data);
      if ((data as any)?.token && (data as any)?.user) {
        store.setAuth((data as any).token, (data as any).user)
        console.log("Auth store after setAuth:", store);
        toast.success("Success!")

        // Ensure persistence is written immediately for tests / navigation flow
        try {
          const tokenToStore = (data as any).token;
          const userToStore = (data as any).user;
          localStorage.setItem(
            "auth-storage",
            JSON.stringify({ state: { token: tokenToStore, user: userToStore, isAuthenticated: !!tokenToStore } })
          );
        } catch (e) {
          // ignore (e.g., server environment)
        }

      } else {
        // Dev mode: no token/user returned, use mock
        console.warn("⚠️ No token/user in response. Using mock data for development.");
        const devUser = {
          id: "1",
          email: "dev@example.com",
          phoneNumber: "08130039337",
          name: "Favour the React dev",
          role: "customer",
        };
        store.setAuth("dev-fake-token", devUser)

        // Persist dev token immediately as well
        try {
          localStorage.setItem(
            "auth-storage",
            JSON.stringify({ state: { token: "dev-fake-token", user: devUser, isAuthenticated: true } })
          );
        } catch (e) {
          // ignore
        }
      }

    console.log("Auth store after setAuth:", useAuthStore.getState());

      if (options.onSuccess) options.onSuccess(data, variables, context)

    },
    onError: (error, variables, context) => {
      toast.error((error as any)?.response?.data?.message || "Something went wrong")
      if (options.onError) options.onError(error, variables, context)
    },
    ...options,
  })
}
