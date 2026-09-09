import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Temporary hardcoded credentials
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'admin@123';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const userData = { username: 'Admin', role: 'Administrator' };
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password.' };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
