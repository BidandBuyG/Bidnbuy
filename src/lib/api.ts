// Later we will replace this with the OpenAPI client generator.
// For now this is a simple example API wrapper.
export const api = {
  auth: {
    login: async (body: { email: string; password: string }) => {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Login failed");
      return res.json() as Promise<{ token: string }>;
    },
  },
};
