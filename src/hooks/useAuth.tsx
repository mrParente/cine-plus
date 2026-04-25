import * as React from "react";

export interface UserProfile {
  name: string;
  email: string;
  createdAt: number;
  expiresAt: number;
}

type RegisteredUser = {
  name: string;
  email: string;
  password: string;
  createdAt: number;
};

type AuthResult = {
  success: boolean;
  message: string;
};

type AuthContextValue = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => AuthResult;
  signUp: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

const USER_STORAGE_KEY = "cineplus:user";
const USERS_STORAGE_KEY = "cineplus:registered-users";
const AUTH_SESSION_DURATION_MS = 1000 * 60 * 30; // 30 minutos

const parseJson = <T,>(value: string | null): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

const getStoredUser = (): UserProfile | null => {
  const stored = parseJson<UserProfile>(sessionStorage.getItem(USER_STORAGE_KEY));
  if (!stored) return null;
  if (Date.now() > stored.expiresAt) {
    sessionStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
  return stored;
};

const saveStoredUser = (user: UserProfile) => {
  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const getRegisteredUsers = (): RegisteredUser[] => {
  return parseJson<RegisteredUser[]>(sessionStorage.getItem(USERS_STORAGE_KEY)) ?? [];
};

const saveRegisteredUsers = (users: RegisteredUser[]) => {
  sessionStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const createUserProfile = (name: string, email: string): UserProfile => ({
  name,
  email,
  createdAt: Date.now(),
  expiresAt: Date.now() + AUTH_SESSION_DURATION_MS,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    return getStoredUser();
  });

  React.useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
  }, []);

  const login = (email: string, password: string): AuthResult => {
    const users = getRegisteredUsers();
    const match = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

    if (!match) {
      return { success: false, message: "Usuário não encontrado. Cadastre-se primeiro." };
    }

    if (match.password !== password) {
      return { success: false, message: "E-mail ou senha incorretos." };
    }

    const profile = createUserProfile(match.name, match.email);
    setUser(profile);
    saveStoredUser(profile);
    return { success: true, message: "Login realizado com sucesso." };
  };

  const signUp = (name: string, email: string, password: string): AuthResult => {
    const users = getRegisteredUsers();
    const existing = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      return { success: false, message: "Já existe uma conta com esse e-mail." };
    }

    const newUser: RegisteredUser = {
      name,
      email,
      password,
      createdAt: Date.now(),
    };

    saveRegisteredUsers([...users, newUser]);

    const profile = createUserProfile(name, email);
    setUser(profile);
    saveStoredUser(profile);
    return { success: true, message: "Cadastro realizado com sucesso." };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(USER_STORAGE_KEY);
  };

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signUp,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
