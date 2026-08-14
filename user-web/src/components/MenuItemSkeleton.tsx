export function MenuItemSkeleton() {
  return (
    <div className="flex gap-4 border-b border-border/70 p-4 animate-pulse">
      <div className="flex-1">
        <div className="h-5 w-3/4 rounded bg-muted"></div>
        <div className="mt-2 h-4 w-1/4 rounded bg-muted"></div>
        <div className="mt-3 h-3 w-full rounded bg-muted"></div>
        <div className="mt-1 h-3 w-5/6 rounded bg-muted"></div>
      </div>
      <div className="relative h-[110px] w-[110px] shrink-0 rounded-xl bg-muted"></div>
    </div>
  );
}
