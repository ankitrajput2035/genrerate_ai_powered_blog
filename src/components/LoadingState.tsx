const LoadingState = () => (
  <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
    <div className="flex items-center gap-2 text-muted-foreground font-sans text-sm">
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot [animation-delay:0.2s]" />
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot [animation-delay:0.4s]" />
      <span className="ml-2">Generating your blog…</span>
    </div>
    <div className="space-y-4">
      {[100, 90, 75, 95, 60].map((w, i) => (
        <div key={i} className="h-4 rounded bg-muted" style={{ width: `${w}%` }} />
      ))}
    </div>
  </div>
);

export default LoadingState;
