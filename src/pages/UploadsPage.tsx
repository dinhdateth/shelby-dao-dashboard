import { useState, useRef } from "react";
import { Upload, FileText, Hash, CloudUpload } from "lucide-react";
import { mockApi, UploadedFile } from "@/lib/mockStore";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const UploadsPage = () => {
  const [files, setFiles] = useState<UploadedFile[]>(mockApi.getFiles());
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      mockApi.uploadFile(file.name);
      setFiles(mockApi.getFiles());
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <h1 className="text-2xl font-display font-bold tracking-tight">Uploads</h1>
          <p className="text-muted-foreground text-sm mt-1">Decentralized file storage</p>
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
          {files.map((f, i) => (
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
                <p className="text-sm text-muted-foreground">{f.size}</p>
                <p className="text-xs text-muted-foreground">{f.uploadedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadsPage;
