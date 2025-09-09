import { useQuery } from "@tanstack/react-query";

const apiUrl = (import.meta.env?.VITE_API_URL as string) || "";

export function useHealthCheck() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/health`);
      if (!res.ok) throw new Error("Health check failed");
      return res.json();
    },
    refetchInterval: 60000, // every 60s
  });

  return { data, error, isLoading };
}
