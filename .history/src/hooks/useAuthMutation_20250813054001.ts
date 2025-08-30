import { useMutation } from "@tanstack/react-query"
import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"

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

      }
      
      else {
      // Dev mode: no token/user returned, use mock
      console.warn("⚠️ No token/user in response. Using mock data for development.");
      store.setAuth("dev-fake-token", {
        id: "1",
        email: "dev@example.com",
        name: "Favour the React dev",
        role: "customer",
      })
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
