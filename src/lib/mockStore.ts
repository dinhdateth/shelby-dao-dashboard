export interface User {
  id: string;
  name: string;
  email: string;
  wallet: string;
  joinedAt: string;
  addedBy: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  hash: string;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  time: string;
}

const generateWallet = () =>
  "0x" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join("") + "...";

const generateHash = () =>
  "Qm" + Array.from({ length: 12 }, () => Math.floor(Math.random() * 36).toString(36)).join("");

let users: User[] = [
  { id: "1", name: "Vitalik B.", email: "vitalik@eth.org", wallet: "0x7a3b9c...d4e2", joinedAt: "2024-01-15", addedBy: "system" },
  { id: "2", name: "Satoshi N.", email: "satoshi@btc.org", wallet: "0x1f2e8b...a7c3", joinedAt: "2024-02-20", addedBy: "system" },
  { id: "3", name: "Ada L.", email: "ada@cardano.io", wallet: "0x9d4c7a...f1b8", joinedAt: "2024-03-10", addedBy: "system" },
  { id: "4", name: "Gavin W.", email: "gavin@dot.network", wallet: "0x5e8f2d...c6a9", joinedAt: "2024-03-22", addedBy: "system" },
];

let files: UploadedFile[] = [
  { id: "1", name: "smart_contract_v2.sol", size: "24 KB", uploadedBy: "Vitalik B.", uploadedAt: "2024-03-20", hash: "QmX7k2pR9vTz" },
  { id: "2", name: "tokenomics.pdf", size: "1.2 MB", uploadedBy: "Satoshi N.", uploadedAt: "2024-03-19", hash: "QmY3n8wL5mKq" },
  { id: "3", name: "whitepaper_draft.md", size: "156 KB", uploadedBy: "Ada L.", uploadedAt: "2024-03-18", hash: "QmZ1b4xJ7nPa" },
];

let activities: Activity[] = [
  { id: "1", action: "Deployed smart contract", user: "Vitalik B.", time: "2 min ago" },
  { id: "2", action: "Uploaded tokenomics.pdf", user: "Satoshi N.", time: "15 min ago" },
  { id: "3", action: "Created new wallet", user: "Ada L.", time: "1 hour ago" },
  { id: "4", action: "Joined the network", user: "Gavin W.", time: "3 hours ago" },
  { id: "5", action: "Staked 500 tokens", user: "Vitalik B.", time: "5 hours ago" },
];

let nextId = 10;

export const mockApi = {
  getUsers: () => [...users],
  getUsersByEmail: (email: string) => users.filter((u) => u.addedBy === email),
  addUser: (name: string, email: string, addedBy: string) => {
    const user: User = {
      id: String(++nextId),
      name,
      email,
      wallet: generateWallet(),
      joinedAt: new Date().toISOString().split("T")[0],
      addedBy,
    };
    users = [user, ...users];
    activities = [{ id: String(++nextId), action: `${name} joined the network`, user: name, time: "Just now" }, ...activities];
    return user;
  },
  getFiles: () => [...files],
  getFilesByEmail: (email: string) => files.filter((f) => f.uploadedBy === email),
  uploadFile: (fileName: string, uploadedBy: string) => {
    const file: UploadedFile = {
      id: String(++nextId),
      name: fileName,
      size: `${Math.floor(Math.random() * 900 + 100)} KB`,
      uploadedBy,
      uploadedAt: new Date().toISOString().split("T")[0],
      hash: generateHash(),
    };
    files = [file, ...files];
    activities = [{ id: String(++nextId), action: `Uploaded ${fileName}`, user: uploadedBy, time: "Just now" }, ...activities];
    return file;
  },
  getActivities: () => [...activities],
  getStats: () => ({
    totalUsers: users.length,
    totalUploads: files.length,
    totalTransactions: 1247 + users.length * 12,
    networkHealth: 99.8,
  }),
};
