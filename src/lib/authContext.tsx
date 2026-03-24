import { createContext, useContext, useState, ReactNode } from "react";

const generateWalletAddress = () =>
  "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

interface AuthContextType {
  isLoggedIn: boolean;
  walletAddress: string | null;
  walletShort: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const walletShort = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null;

  const login = (_email: string, _password: string) => {
    const wallet = generateWalletAddress();
    setWalletAddress(wallet);
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setWalletAddress(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, walletAddress, walletShort, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
