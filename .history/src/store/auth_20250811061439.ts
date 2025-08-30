import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  role: 'customer' | 'vendor';
}

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => {
        console.log("setAuth called with:", token, user)
        set({
          token,
          user,
          isAuthenticated: true,
        }),
      }
      logout: () => {

        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });

        localStorage.removeItem('auth-storage')
      }
    }),
    {
      name: 'auth-storage',
    }
  )
); 

console.log("Initial Auth store state:", useAuthStore.getState());
console.log("Initial token:", useAuthStore.getState().token);

useAuthStore.subscribe((state) => {
  console.log("Auth store changed:", state);
  console.log("Token:", state.token);
});

// useAuthStore.getState().setAuth("my-test-token", { id: "1", email: "a", name: "A", role: "customer" });

// useAuthStore.getState().logout();


if (typeof window !== 'undefined') {
  const storedToken = localStorage.getItem('jwt_token');
  if (storedToken) {
    useAuthStore.setState({ token: storedToken });
  }
}