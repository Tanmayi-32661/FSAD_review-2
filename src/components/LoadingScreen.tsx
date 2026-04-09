const LoadingScreen = ({ label = "Loading placement system..." }: { label?: string }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
        <p className="text-sm text-slate-300">{label}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
