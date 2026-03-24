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

  // Check if Petra is installed — retry a few times since extensions inject late
  useEffect(() => {
    console.log("[Petra] Checking if Petra wallet is installed...");
    let attempts = 0;
    const maxAttempts = 10;

    const check = () => {
      const aptos = getAptos();
      console.log(`[Petra] Check attempt ${attempts + 1}: window.aptos =`, aptos ? "found" : "not found");
      if (aptos) {
        setIsPetraInstalled(true);
        return;
      }
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(check, 300);
      } else {
        console.log("[Petra] Petra wallet not detected after all attempts");
        setIsPetraInstalled(false);
      }
    };

    check();
  }, []);

  // Check if already connected on mount
  useEffect(() => {
    if (!isPetraInstalled) return;

    const checkConnection = async () => {
      const aptos = getAptos();
      if (!aptos) return;
      try {
        console.log("[Petra] Checking existing connection...");
        const connected = await aptos.isConnected();
        console.log("[Petra] Already connected:", connected);
        if (connected) {
          const account = await aptos.account();
          console.log("[Petra] Restored account:", account.address);
          setWalletAddress(account.address);
        }
      } catch (err) {
        console.log("[Petra] Error checking connection:", err);
      }
    };
    checkConnection();
  }, [isPetraInstalled]);

  const connectWallet = async () => {
    setError(null);

    console.log("[Petra] Connect requested. Checking window.aptos...");
    const aptos = getAptos();

    if (!aptos) {
      const msg = "Please install Petra wallet";
      console.error("[Petra]", msg);
      setError(msg);
      return;
    }

    setConnecting(true);
    try {
      // Step 1: Connect
      console.log("[Petra] Calling window.aptos.connect()...");
      const connectResponse = await aptos.connect();
      console.log("[Petra] connect() response:", JSON.stringify(connectResponse));

      // Step 2: Get account for full address
      console.log("[Petra] Calling window.aptos.account()...");
      const accountResponse = await aptos.account();
      console.log("[Petra] account() response:", JSON.stringify(accountResponse));

      const address = accountResponse.address || connectResponse.address;
      if (!address) {
        throw new Error("No address returned from wallet");
      }

      console.log("[Petra] Connected with address:", address);
      setWalletAddress(address);
      setIsPetraInstalled(true);
    } catch (err: any) {
      console.error("[Petra] Connection error:", err);
      if (err?.code === 4001 || err?.message?.includes("rejected") || err?.message?.includes("User rejected")) {
        setError("Connection rejected by user");
      } else {
        setError(err?.message || "Failed to connect wallet");
      }
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    console.log("[Petra] Disconnecting...");
    try {
      const aptos = getAptos();
      if (aptos) {
        await aptos.disconnect();
        console.log("[Petra] Disconnected successfully");
      }
    } catch (err) {
      console.error("[Petra] Disconnect error:", err);
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
