export function CouponSkeleton() {
  return (
    <div className="mx-3 flex overflow-hidden rounded-2xl bg-card shadow-sm animate-pulse">
      <div className="w-[90px] shrink-0 bg-muted"></div>
      <div className="min-w-0 flex-1 px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="h-6 w-24 rounded bg-muted"></div>
          <div className="h-5 w-16 rounded bg-muted"></div>
        </div>
        <div className="mt-2 h-5 w-3/4 rounded bg-muted"></div>
        <div className="my-3 border-t border-dashed border-border/40" />
        <div className="h-4 w-full rounded bg-muted"></div>
        <div className="mt-1 h-4 w-5/6 rounded bg-muted"></div>
        <div className="mt-4 h-4 w-16 rounded bg-muted"></div>
      </div>
    </div>
  );
}
