import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const getAptos = () => (window as any).aptos as {
  connect: () => Promise<{ address: string }>;
  disconnect: () => Promise<void>;
  account: () => Promise<{ address: string }>;
  isConnected: () => Promise<boolean>;
} | undefined;

interface AuthContextType {
  isLoggedIn: boolean;
  walletAddress: string | null;
  walletShort: string | null;
  connecting: boolean;
  error: string | null;
  isPetraInstalled: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPetraInstalled, setIsPetraInstalled] = useState(false);

  const isLoggedIn = !!walletAddress;

  const walletShort = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null;

  // Check if Petra is installed on mount
  useEffect(() => {
    const checkPetra = () => {
      setIsPetraInstalled(!!getAptos());
    };
    checkPetra();
    const timer = setTimeout(checkPetra, 500);
    return () => clearTimeout(timer);
  }, []);

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      const aptos = getAptos();
      if (!aptos) return;
      try {
        const isConnected = await aptos.isConnected();
        if (isConnected) {
          const account = await aptos.account();
          setWalletAddress(account.address);
        }
      } catch {
        // Not connected, that's fine
      }
    };
    checkConnection();
  }, [isPetraInstalled]);

  const connectWallet = async () => {
    setError(null);
    const aptos = getAptos();

    if (!aptos) {
      setError("Please install Petra wallet");
      return;
    }

    setConnecting(true);
    try {
      const response = await aptos.connect();
      setWalletAddress(response.address);
    } catch (err: any) {
      if (err?.code === 4001 || err?.message?.includes("rejected")) {
        setError("Connection rejected by user");
      } else {
        setError("Failed to connect wallet");
      }
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      const aptos = getAptos();
      if (aptos) {
        await aptos.disconnect();
      }
    } catch {
      // Ignore disconnect errors
    }
    setWalletAddress(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        walletAddress,
        walletShort,
        connecting,
        error,
        isPetraInstalled,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
