import { deleteToken, getToken, saveToken } from "@/lib/auth";
import { api } from "@/lib/axios";
import { User, UserRole } from "@vojon/types";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName?: string | null;
  email: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkExistingSession();
  }, []);

  //   ==================== Check Existing Session ====================
  async function checkExistingSession() {
    try {
      const token = await getToken();
      if (token) {
        const res = await api.get("/auth/me");
        setUser(res.data);
      }
    } catch (error) {
      await deleteToken();
    } finally {
      setIsLoading(false);
    }
  }

  //   ==================== Login ====================
  async function login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    await saveToken(res.data.token);
    setUser(res.data.user);
  }

  //   ==================== Register ====================
  async function register(data: RegisterData) {
    const res = await api.post("/auth/register", data);
    await saveToken(res.data.token);
    setUser(res.data.user);
  }

  //   ==================== Logout ====================
  async function logout() {
    await deleteToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//   ==================== Use Auth ====================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
