export default function Loading() {
  return (
    <div className="animate-pulse pt-8">
      <div className="mb-5 h-4 w-32 rounded bg-white/5" />
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-white/5" />
        <div className="space-y-2">
          <div className="h-6 w-64 rounded bg-white/5" />
          <div className="h-4 w-40 rounded bg-white/5" />
        </div>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}
