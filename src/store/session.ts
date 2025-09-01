// Very simple placeholder for auth session.
// Later we’ll integrate Redux Toolkit or Context.

export const session = {
  token: "",
  setToken(t: string) { this.token = t; },
  clear() { this.token = ""; }
};
