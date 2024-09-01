import {ref} from 'vue'

// hold the authentication state
export const isAuthenticated = ref(false);

// provide authentication functions
export function useAuth() {
  const login = () => {
    isAuthenticated.value = true;
  };

  const logout = () => {
    isAuthenticated.value = false;
  };

  return { isAuthenticated, login, logout };
}
