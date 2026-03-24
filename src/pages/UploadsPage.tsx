import { useState, useRef } from "react";
import { Upload, FileText, Hash } from "lucide-react";
import { mockApi, UploadedFile } from "@/lib/mockStore";
import { DashboardLayout } from "@/components/DashboardLayout";

const UploadsPage = () => {
  const [files, setFiles] = useState<UploadedFile[]>(mockApi.getFiles());
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    mockApi.uploadFile(file.name);
    setFiles(mockApi.getFiles());
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">Uploads</h1>

        <div
          onClick={() => fileRef.current?.click()}
          className="glass-card-hover rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer border-dashed !border-2"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <p className="font-medium">Drop files or click to upload</p>
          <p className="text-sm text-muted-foreground mt-1">Files are stored on IPFS (mock)</p>
          <input ref={fileRef} type="file" className="hidden" onChange={handleUpload} />
        </div>

        <div className="space-y-3">
          {files.map((f) => (
            <div key={f.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
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
