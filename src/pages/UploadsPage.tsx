import { useState, useRef } from "react";
import { Upload, FileText, Hash, CloudUpload, Wallet } from "lucide-react";
import { mockApi, UploadedFile } from "@/lib/mockStore";
import { useAuth } from "@/lib/authContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const UploadsPage = () => {
  const { walletAddress } = useAuth();
  const [files, setFiles] = useState<UploadedFile[]>(mockApi.getFiles());
  const [uploading, setUploading] = useState(false);
  const [showMine, setShowMine] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !walletAddress) return;
    setUploading(true);
    setTimeout(() => {
      mockApi.uploadFile(file.name, walletAddress);
      setFiles(mockApi.getFiles());
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }, 1000);
  };

  const displayedFiles = showMine && walletAddress
    ? files.filter((f) => f.uploadedBy === walletAddress)
    : files;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight">Uploads</h1>
            <p className="text-muted-foreground text-sm mt-1">Decentralized file storage</p>
          </div>
          <button
            onClick={() => setShowMine(!showMine)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              showMine
                ? "gradient-btn"
                : "bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
            }`}
          >
            <Wallet className="w-4 h-4" />
            {showMine ? "My Files" : "All Files"}
          </button>
        </div>

        <div
          onClick={() => !uploading && fileRef.current?.click()}
          className="glass-card-hover rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer border-dashed !border-2 group opacity-0 animate-fade-in"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <LoadingSpinner size="lg" />
              <p className="text-sm text-muted-foreground animate-pulse">Uploading to IPFS...</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_30px_-6px_hsl(var(--primary)/0.4)]">
                <CloudUpload className="w-7 h-7 text-primary transition-transform duration-300 group-hover:-translate-y-1" />
              </div>
              <p className="font-medium">Drop files or click to upload</p>
              <p className="text-sm text-muted-foreground mt-1">Files are pinned on IPFS (mock)</p>
            </>
          )}
          <input ref={fileRef} type="file" className="hidden" onChange={handleUpload} />
        </div>

        <div className="space-y-3">
          {displayedFiles.length === 0 ? (
            <div className="glass-card rounded-xl p-10 text-center text-sm text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
              No files uploaded from your wallet yet
            </div>
          ) : (
            displayedFiles.map((f, i) => (
              <div
                key={f.id}
                className="glass-card rounded-xl p-4 flex items-center gap-4 hover:border-primary/20 transition-all duration-200 hover:shadow-[0_0_20px_-8px_hsl(var(--primary)/0.2)] group opacity-0 animate-fade-in"
                style={{ animationDelay: `${200 + i * 80}ms`, animationFillMode: "forwards" }}
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-secondary/20">
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Hash className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">{f.hash}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-mono text-primary/70">{mockApi.shortWallet(f.uploadedBy)}</p>
                  <p className="text-xs text-muted-foreground">{f.uploadedAt}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadsPage;
