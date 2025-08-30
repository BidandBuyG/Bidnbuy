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
      if ((data as any)?.token && (data as any)?.user) {
        const response = useAuthStore.getState().setAuth((data as any).token, (data as any).user)
        toast.success("Success!")

console.log("Auth store after setAuth:", useAuthStore.getState());      }
      if (options.onSuccess) options.onSuccess(data, variables, context)
    },
    onError: (error, variables, context) => {
      toast.error((error as any)?.response?.data?.message || "Something went wrong")
      if (options.onError) options.onError(error, variables, context)
    },
    ...options,
  })
}
