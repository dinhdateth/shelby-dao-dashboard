export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} rounded-full border-2 border-muted border-t-primary animate-spin`}
      />
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-muted border-t-primary animate-spin" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-b-accent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Loading ShelbyDAO...</p>
    </div>
  );
}
