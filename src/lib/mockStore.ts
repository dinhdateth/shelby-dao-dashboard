export interface User {
  id: string;
  name: string;
  email: string;
  wallet: string;
  joinedAt: string;
  addedBy: string; // wallet address of who added them
}

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  uploadedBy: string; // wallet address
  uploadedAt: string;
  hash: string;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  wallet: string;
  time: string;
}

const generateWallet = () =>
  "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

const generateHash = () =>
  "Qm" + Array.from({ length: 12 }, () => Math.floor(Math.random() * 36).toString(36)).join("");

const shortWallet = (w: string) => `${w.slice(0, 6)}...${w.slice(-4)}`;

const systemWallets = [generateWallet(), generateWallet(), generateWallet(), generateWallet()];

let users: User[] = [
  { id: "1", name: "Vitalik B.", email: "vitalik@eth.org", wallet: systemWallets[0], joinedAt: "2024-01-15", addedBy: "system" },
  { id: "2", name: "Satoshi N.", email: "satoshi@btc.org", wallet: systemWallets[1], joinedAt: "2024-02-20", addedBy: "system" },
  { id: "3", name: "Ada L.", email: "ada@cardano.io", wallet: systemWallets[2], joinedAt: "2024-03-10", addedBy: "system" },
  { id: "4", name: "Gavin W.", email: "gavin@dot.network", wallet: systemWallets[3], joinedAt: "2024-03-22", addedBy: "system" },
];

let files: UploadedFile[] = [
  { id: "1", name: "smart_contract_v2.sol", size: "24 KB", uploadedBy: systemWallets[0], uploadedAt: "2024-03-20", hash: "QmX7k2pR9vTz" },
  { id: "2", name: "tokenomics.pdf", size: "1.2 MB", uploadedBy: systemWallets[1], uploadedAt: "2024-03-19", hash: "QmY3n8wL5mKq" },
  { id: "3", name: "whitepaper_draft.md", size: "156 KB", uploadedBy: systemWallets[2], uploadedAt: "2024-03-18", hash: "QmZ1b4xJ7nPa" },
];

let activities: Activity[] = [
  { id: "1", action: "Deployed smart contract", user: "Vitalik B.", wallet: systemWallets[0], time: "2 min ago" },
  { id: "2", action: "Uploaded tokenomics.pdf", user: "Satoshi N.", wallet: systemWallets[1], time: "15 min ago" },
  { id: "3", action: "Created new wallet", user: "Ada L.", wallet: systemWallets[2], time: "1 hour ago" },
  { id: "4", action: "Joined the network", user: "Gavin W.", wallet: systemWallets[3], time: "3 hours ago" },
  { id: "5", action: "Staked 500 tokens", user: "Vitalik B.", wallet: systemWallets[0], time: "5 hours ago" },
];

let nextId = 10;

export const mockApi = {
  getUsers: () => [...users],
  getUsersByWallet: (walletAddress: string) =>
    users.filter((u) => u.addedBy === walletAddress),
  addUser: (name: string, email: string, addedByWallet: string) => {
    const user: User = {
      id: String(++nextId),
      name,
      email,
      wallet: generateWallet(),
      joinedAt: new Date().toISOString().split("T")[0],
      addedBy: addedByWallet,
    };
    users = [user, ...users];
    activities = [
      {
        id: String(++nextId),
        action: `${name} joined the network`,
        user: name,
        wallet: addedByWallet,
        time: "Just now",
      },
      ...activities,
    ];
    return user;
  },
  getFiles: () => [...files],
  getFilesByWallet: (walletAddress: string) =>
    files.filter((f) => f.uploadedBy === walletAddress),
  uploadFile: (fileName: string, walletAddress: string) => {
    const file: UploadedFile = {
      id: String(++nextId),
      name: fileName,
      size: `${Math.floor(Math.random() * 900 + 100)} KB`,
      uploadedBy: walletAddress,
      uploadedAt: new Date().toISOString().split("T")[0],
      hash: generateHash(),
    };
    files = [file, ...files];
    activities = [
      {
        id: String(++nextId),
        action: `Uploaded ${fileName}`,
        user: shortWallet(walletAddress),
        wallet: walletAddress,
        time: "Just now",
      },
      ...activities,
    ];
    return file;
  },
  getActivities: () => [...activities],
  getActivitiesByWallet: (walletAddress: string) =>
    activities.filter((a) => a.wallet === walletAddress),
  getStats: () => ({
    totalUsers: users.length,
    totalUploads: files.length,
    totalTransactions: 1247 + users.length * 12,
    networkHealth: 99.8,
  }),
  getWalletStats: (walletAddress: string) => ({
    myUsers: users.filter((u) => u.addedBy === walletAddress).length,
    myUploads: files.filter((f) => f.uploadedBy === walletAddress).length,
    myTransactions: Math.floor(Math.random() * 50 + 10),
  }),
  shortWallet,
};
