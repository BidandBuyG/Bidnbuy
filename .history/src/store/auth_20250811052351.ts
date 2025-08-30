import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  name: string;
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
      setAuth: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
); 


useAuthStore.subscribe((state) => {
  console.log("Auth store changed:", state);
  console.log("Token:", state.token);
});


if (typeof window !== 'undefined') {
  const storedToken = localStorage.getItem('jwt_token');
  if (storedToken) {
    useAuthStore.setState({ token: storedToken });
  }
}