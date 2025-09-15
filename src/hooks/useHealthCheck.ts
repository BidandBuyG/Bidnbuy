/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";

const apiUrl = (import.meta.env?.VITE_API_URL as string) || "";

export function useHealthCheck() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/health`);
      if (!res.ok) throw new Error("Health check failed");

      // Some health endpoints respond with 204 or an empty body.
      // Attempt to parse JSON only when there is a JSON response.
      const contentType = res.headers.get("content-type") || "";
      if (res.status === 204) return null;
      if (contentType.includes("application/json")) {
        try {
          return await res.json();
        } catch (e) {
          // If parsing fails, return raw text instead of throwing
          try {
            const text = await res.text();
            return text || null;
          } catch (_e) {
            return null;
          }
        }
      }

      // Fallback: return text body if present
      try {
        const text = await res.text();
        return text || null;
      } catch (_e) {
        return null;
      }
    },
    refetchInterval: 60000, // every 60s
  });

  return { data, error, isLoading };
}
