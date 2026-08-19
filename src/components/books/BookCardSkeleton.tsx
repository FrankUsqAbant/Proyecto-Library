import { Skeleton } from '@/components/ui/skeleton';

export function BookCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121212] overflow-hidden shadow-sm h-full flex flex-col">
      <Skeleton className="aspect-[2/3] w-full rounded-none" />
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
        <Skeleton className="h-3 w-1/2" />
        <div className="pt-2 mt-auto border-t border-[var(--border)] flex justify-between">
          <Skeleton className="h-6 w-12 rounded-md" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    </div>
  );
}
