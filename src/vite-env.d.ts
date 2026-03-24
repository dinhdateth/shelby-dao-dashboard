/// <reference types="vite/client" />

interface AptosWallet {
  connect: () => Promise<{ address: string }>;
  disconnect: () => Promise<void>;
  account: () => Promise<{ address: string }>;
  isConnected: () => Promise<boolean>;
}

declare global {
  interface Window {
    aptos?: AptosWallet;
  }
}

export {};
